# How the WebGL grid and portrait distortion work

This page explains the interactive background in [`RippleGrid.tsx`](../src/app/components/RippleGrid.tsx) for someone
new to GPU rendering and shaders.

## What is actually GPU-rendered?

The final effect uses **WebGL 2**. JavaScript does not draw the grid or manipulate portrait pixels. It only:

1. creates a WebGL canvas and shader program;
2. loads the portrait as a GPU texture;
3. sends changing values such as cursor position and time to the GPU;
4. asks the GPU to draw one full-screen triangle.

The fragment shader then computes the color of every visible pixel. During verification, Chrome reported the renderer as
`ANGLE Metal Renderer: Apple M4 Pro`, confirming that the shader ran through the Mac's GPU rather than the old Canvas 2D
implementation.

## Files involved

- [`src/app/components/RippleGrid.tsx`](../src/app/components/RippleGrid.tsx) contains the WebGL setup, vertex shader,
  fragment shader, interaction state, and animation loop.
- [`src/app/components/sidebar/ParticlePortrait.tsx`](../src/app/components/sidebar/ParticlePortrait.tsx) is a DOM
  marker that tells the shader where the portrait belongs. Its CSS background is also the fallback if WebGL is
  unavailable.
- [`src/app/page.tsx`](../src/app/page.tsx) mounts the fixed shader canvas behind the page content.

## A beginner's mental model

A normal canvas drawing loop might say, “draw this line, then draw that image.” A fragment shader works in the opposite
direction:

> For the pixel currently being processed, what color should it be?

The GPU runs that question for thousands of pixels in parallel.

The pipeline here has two small programs:

1. The **vertex shader** creates a triangle covering the screen.
2. The **fragment shader** colors every pixel inside that triangle, which means the whole viewport.

The browser composites the regular HTML cards and text above that WebGL canvas.

## 1. Creating the WebGL 2 context

The React effect runs after the canvas is mounted:

```ts
const gl = canvas?.getContext('webgl2', {
  alpha: false,
  antialias: false,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance',
})
```

- `webgl2` gives us GLSL ES 3.00 shaders.
- `alpha: false` makes the canvas opaque, avoiding an unnecessary transparent GPU layer.
- `antialias: false` is fine because the shader smooths the grid lines itself.
- `powerPreference: 'high-performance'` asks the browser to prefer the faster GPU.
- `preserveDrawingBuffer: true` keeps completed frames available to browser capture tools.

If WebGL 2 is unavailable, setup stops. The CSS grid and portrait background remain visible as a static fallback.

## 2. The full-screen triangle

The vertex buffer contains three points:

```ts
new Float32Array([-1, -1, 3, -1, -1, 3])
```

WebGL's screen coordinate range is `-1` to `1`. These oversized coordinates produce one triangle covering the entire
viewport. This is a common shader technique: one triangle has less edge overlap than two triangles forming a rectangle.

The vertex shader simply forwards those positions:

```glsl
#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
```

There is no geometry animation. All visual work happens in the fragment shader.

## 3. Uniforms: JavaScript's inputs to the shader

Shaders cannot read React state, the DOM, or pointer events. **Uniforms** are small values JavaScript sends to every
shader invocation:

```glsl
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 clickPoint;
uniform vec2 portraitOrigin;
uniform vec2 portraitSize;
uniform float pixelRatio;
uniform float time;
uniform float clickTime;
uniform float hoverStrength;
uniform float clickStrength;
uniform sampler2D portrait;
```

Think of them as the shader's read-only parameters for the current frame.

| Uniform                           | Meaning                                     |
| --------------------------------- | ------------------------------------------- |
| `resolution`                      | Physical canvas width and height            |
| `cursor`                          | Current pointer position                    |
| `clickPoint`                      | Origin of the newest click wave             |
| `portraitOrigin` / `portraitSize` | Portrait marker rectangle from the DOM      |
| `pixelRatio`                      | Converts CSS pixels to physical pixels      |
| `time` / `clickTime`              | Drives motion and wave expansion            |
| `hoverStrength` / `clickStrength` | Makes the effect stronger near the portrait |
| `portrait`                        | The uploaded portrait image texture         |

The JavaScript animation loop updates these values and issues one draw call:

```ts
gl.drawArrays(gl.TRIANGLES, 0, 3)
```

## 4. Converting the current pixel to page coordinates

Inside the fragment shader, `gl_FragCoord` identifies the current physical pixel. WebGL's vertical origin is at the
bottom, while browser pointer coordinates start at the top, so the shader flips Y:

```glsl
vec2 point = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
```

Now `point`, `cursor`, `clickPoint`, and the portrait rectangle all use the same top-left coordinate system.

## 5. Building the wave displacement

The shader does not move the canvas. It changes the coordinate used to decide what belongs at each pixel.

For the cursor wave, it calculates:

1. the vector from the cursor to the pixel;
2. the distance from the cursor;
3. a sine wave based on that distance and time;
4. an exponential falloff so distant pixels move less;
5. an outward direction for the displacement.

The important expression is:

```glsl
float hoverWave = sin(cursorDistance / 15.0 - time * 5.0)
  * exp(-cursorDistance / 320.0)
  * hoverStrength;
```

The sine alternates between positive and negative values, pushing coordinates outward and inward. Subtracting time makes
its rings move.

The click wave uses an expanding ring:

```glsl
float ringDistance = clickDistance - clickTime * 430.0;
```

`clickTime * 430` is the ring radius. As time increases, the radius grows by roughly 430 CSS pixels per second. Pixels
near that radius receive the largest displacement; pixels far from it are reduced by the exponential falloff.

Both effects become one offset:

```glsl
return (
  hoverDirection * hoverWave * 7.0
  + clickDirection * clickWave * 12.0
) * pixelRatio;
```

The hover and click waves can therefore overlap naturally.

## 6. Drawing a procedural grid

No grid image is loaded. The shader repeats coordinates every 40 CSS pixels:

```glsl
float gridSize = 40.0 * pixelRatio;
vec2 gridCell = mod(warpedPoint, gridSize);
vec2 lineDistance = min(gridCell, gridSize - gridCell);
```

`mod` tells us where the pixel falls inside its current 40-pixel cell. A pixel close to either cell edge belongs to a
grid line.

The shader evaluates the grid using the **warped** coordinate:

```glsl
vec2 warpedPoint = point + offset;
```

That single change is why the lines bend around the pointer and waves. The shader mixes two Nord colors for the result:

- background: `#2E3440`;
- grid line: `#3B4252`.

## 7. Rendering and distorting the portrait

The portrait starts as `/images/me.png`. JavaScript uploads it once with `gl.texImage2D`, making it a GPU texture.

The shader converts the current screen pixel into a `0..1` coordinate inside the portrait marker:

```glsl
vec2 portraitUv = (point - portraitOrigin) / portraitSize;
```

These normalized coordinates are called **UV coordinates**. `(0, 0)` is one corner of the texture and `(1, 1)` is the
opposite corner.

A circular mask decides whether the current pixel belongs to the portrait:

```glsl
float portraitMask = 1.0 - smoothstep(
  0.492,
  0.505,
  length(portraitUv - 0.5)
);
```

The narrow `smoothstep` range softens the circle edge. Inside the circle, the wave offset changes which texture
coordinate gets sampled:

```glsl
vec2 distortedUv = clamp(
  portraitUv + offset * 1.2 / portraitSize,
  0.0,
  1.0
);
vec3 portraitColor = texture(portrait, distortedUv).rgb;
```

This preserves the original image resolution. Unlike the old tiled Canvas approach, the GPU samples the continuous
texture instead of moving visible image blocks.

## 8. Making the effect stronger near the portrait

JavaScript measures the pointer's distance from the nearest edge of the portrait marker. That distance becomes a `0..1`
proximity value over 700 pixels.

The grid always keeps a minimum effect:

```ts
hoverStrength = 0.15 + proximity ** 3 * 0.45
clickStrength = 0.4 + proximity ** 3 * 0.25
```

Consequences:

- far from the portrait, hover strength is still `0.15` and click strength is still `0.4`;
- near the portrait, hover reaches `0.6` and click reaches `0.65`;
- cubing proximity keeps the strong region concentrated near the portrait instead of affecting most of the page equally.

Hover strength is also multiplied by a smooth 500 ms ramp. A new movement after the effect has gone idle starts at zero,
then uses `t * t * (3 - 2 * t)` to ease to full strength without snapping on.

## 9. React and DOM responsibilities

The WebGL canvas is `fixed`, fills the viewport, and has `pointer-events: none`. Normal links and cards therefore remain
interactive.

The page content uses a higher Z index, so HTML remains above the shader. The portrait is different: its DOM element is
only a position marker and fallback. After the GPU texture is ready, the WebGL component removes the marker's CSS
background so the shader-rendered portrait becomes visible.

On scroll and resize, JavaScript reads the marker's new bounding rectangle and updates its uniforms. This keeps the GPU
portrait aligned with the layout without making the shader aware of the DOM.

## 10. Rendering only while needed

`requestAnimationFrame` runs while:

- the pointer wave is fading, for 1.4 seconds after movement; or
- a click wave is expanding, for 3 seconds.

At rest, the last frame remains on screen and no new frames are requested. This avoids running a full-screen shader
continuously when nothing is changing.

The device pixel ratio is capped at `2`. A higher value would greatly increase the number of fragments the GPU processes
without a useful visual improvement on this background.

## Tuning reference

The easiest way to experiment is to change one constant at a time in the fragment shader.

| Value                 | Current setting | Visible effect                                |
| --------------------- | --------------: | --------------------------------------------- |
| Grid spacing          |            `40` | Distance between grid lines                   |
| Hover wavelength      |            `15` | Smaller values create tighter ripples         |
| Hover animation speed |             `5` | Larger values move hover waves faster         |
| Hover falloff         |           `320` | Larger values spread hover distortion farther |
| Hover displacement    |             `7` | Maximum grid movement from hover              |
| Hover ramp            |        `500 ms` | Time to smoothly reach full hover strength    |
| Click ring speed      |           `430` | Expansion speed in CSS pixels per second      |
| Click wavelength      |            `10` | Spacing inside the click ring                 |
| Click ring width      |            `70` | Thickness of the visible click wave           |
| Click displacement    |            `12` | Maximum grid movement from clicks             |
| Portrait multiplier   |           `1.2` | How much more the portrait texture bends      |

## How to verify that the shader is really running

In browser developer tools, select the page canvas and run:

```js
const gl = document.querySelector('canvas').getContext('webgl2')
gl.getParameter(gl.VERSION)
```

You should see a WebGL 2 version string. To inspect the renderer when the browser exposes it:

```js
const extension = gl.getExtension('WEBGL_debug_renderer_info')
gl.getParameter(extension.UNMASKED_RENDERER_WEBGL)
```

The automated verification for this implementation confirmed:

- an active WebGL 2 shader program;
- Apple M4 Pro through ANGLE's Metal renderer;
- cursor movement, click, and held-pointer drag;
- fixed-grid behavior after mobile scrolling;
- no browser console errors;
- a successful production build.

## Common failure modes

- **The static fallback remains visible:** the image texture may not have loaded or the shader failed to compile. Check
  the console for the shader compile log.
- **The portrait is misplaced after scrolling:** confirm the scroll listener updates `portraitOrigin` and
  `portraitSize`.
- **The image is upside down:** texture upload and screen coordinates disagree about the vertical origin. Flip the
  texture during upload or invert `portraitUv.y`, but not both.
- **The center produces broken pixels:** normalizing a zero-length direction divides by zero. The shader guards with
  `max(length(...), 0.001)`.
- **High-resolution screens run slowly:** lower the device-pixel-ratio cap before simplifying the effect itself.

The key idea is small: JavaScript describes the interaction, while one fragment shader turns coordinates into a warped
grid and portrait. Everything visible in the animated layer is produced by that shader.
