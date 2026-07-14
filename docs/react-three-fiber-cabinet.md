# How the React Three Fiber project cabinet works

This guide explains the 3D project cabinet for someone who understands React but is new to Three.js, React Three Fiber,
render loops, and the browser GPU stack.

The main implementation lives in:

- [`src/app/components/projects/ProjectCabinet.tsx`](../src/app/components/projects/ProjectCabinet.tsx), which owns the
  canvas, camera, cabinet architecture, lighting, project selection, dragging, and regular HTML details;
- [`src/app/components/projects/ProjectArtifacts.tsx`](../src/app/components/projects/ProjectArtifacts.tsx), which owns
  the seven stylized project objects and their animation;
- [`src/app/page.tsx`](../src/app/page.tsx), which supplies serializable project data to the client-side cabinet;
- [`src/app/utils/projects.ts`](../src/app/utils/projects.ts), which remains the source of project descriptions, links,
  and technology data.

The earlier [`WebGL grid and portrait guide`](./webgl-ripple-grid.md) explains the custom shader background. That effect
and this cabinet both use the GPU, but they reach it through different programming layers.

## The short version

The cabinet is built with three libraries:

- **Three.js** supplies the actual 3D engine: scenes, cameras, geometry, materials, lights, raycasting, and the WebGL
  renderer.
- **React Three Fiber**, usually shortened to R3F or Fiber, lets React create and update Three.js objects using JSX.
- **Drei** supplies tested higher-level R3F helpers such as rounded boxes, floating motion, environment lighting, lines,
  and contact shadows.

React does not paint the 3D objects into HTML. It describes a Three.js scene. Three.js converts that scene into WebGL
commands and shaders. The browser passes those commands to its graphics backend, which executes them on the GPU.

## The complete stack

```text
Project data in projects.ts
        |
        v
Next.js server component: page.tsx
        | serializable props only
        v
React client component: ProjectCabinet
        |
        v
React Three Fiber <Canvas> and reconciler
        |
        +--> Drei helpers: RoundedBox, Float, Line,
        |                  Environment, Lightformer, ContactShadows
        |
        v
Three.js scene graph
Scene -> Group -> Mesh -> BufferGeometry + Material
        |
        v
THREE.WebGLRenderer
        |
        v
WebGL 2 or WebGL 1 browser context
        |
        v
Browser GPU process / translation layer such as ANGLE
        |
        v
Native graphics API and driver, such as Metal on macOS
        |
        v
GPU vertex processing -> rasterization -> fragment processing
        |
        v
Canvas framebuffer -> browser compositor -> screen
```

This project does **not** currently use WebGPU for the cabinet. React Three Fiber and Three.js are rendering it through
`THREE.WebGLRenderer`. The browser chooses the exact WebGL version and native backend. For example, Chrome on macOS
usually translates WebGL through ANGLE to Metal, but that is a browser implementation detail rather than something the
React code controls.

## Why Fiber exists

Without Fiber, creating a Three.js mesh looks roughly like this:

```ts
const geometry = new THREE.BoxGeometry(2, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: '#eceff4' })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 1, 0)
scene.add(mesh)
```

Fiber lets the same idea be expressed as React JSX:

```tsx
<mesh position={[0, 1, 0]}>
  <boxGeometry args={[2, 1, 1]} />
  <meshStandardMaterial color='#eceff4' />
</mesh>
```

These are not DOM elements. Fiber's custom React renderer interprets them as Three.js constructors and properties:

| JSX element              | Three.js object                    |
| ------------------------ | ---------------------------------- |
| `<group>`                | `THREE.Group`                      |
| `<mesh>`                 | `THREE.Mesh`                       |
| `<boxGeometry>`          | `THREE.BoxGeometry`                |
| `<meshStandardMaterial>` | `THREE.MeshStandardMaterial`       |
| `<directionalLight>`     | `THREE.DirectionalLight`           |

When React mounts, updates, or unmounts this JSX, Fiber applies the corresponding changes to the Three.js scene graph.
React decides **what objects exist**. Three.js decides **how those objects are rendered**.

## What Drei adds

Drei is a companion library built on Fiber. It is not another renderer. Its components create and manage useful
Three.js objects that would otherwise require repetitive setup.

The cabinet uses:

| Drei helper       | Job in this project                                                                    |
| ----------------- | -------------------------------------------------------------------------------------- |
| `RoundedBox`      | Produces the soft-beveled Braun/Apple-like cabinet and product geometry                |
| `Float`           | Adds restrained idle movement without a custom animation controller                    |
| `Line`            | Renders CherryPick's Git branches with screen-consistent line thickness                 |
| `Environment`     | Builds a small environment map for material reflections                                |
| `Lightformer`     | Places virtual studio softboxes inside that environment                                |
| `ContactShadows`  | Adds soft grounding shadows below the objects using an offscreen shadow pass            |

Using these helpers is why the current implementation no longer contains manual shader compilation, buffer setup,
framebuffer management, or custom rounded-box geometry code.

## 1. Project data crosses the server/client boundary

The home page is a Next.js server component. `ProjectCabinet` is a client component because WebGL, pointer events,
animation frames, and browser canvas APIs only exist in the browser.

The full project records cannot be sent directly into a client component because some records contain React component
functions, such as logo components. Functions are not serializable. The page therefore sends only the fields the
cabinet needs:

```tsx
<ProjectCabinet
  projects={otherProjects.map(({ name, description, acquireInfo, stack }) => ({
    name,
    description,
    acquireInfo: acquireInfo.map(({ type, link }) => ({ type, link })),
    stack,
  }))}
/>
```

This is a normal Next.js data boundary, not a GPU concern. It simply ensures that the browser receives plain data before
the 3D scene starts.

## 2. Canvas creates the Three.js renderer

`ProjectCabinet` mounts Fiber's `Canvas`:

```tsx
<Canvas
  shadows
  dpr={[1, 1.75]}
  camera={{ fov: 36, near: 0.1, far: 50, position: [0, 1.25, 9.2] }}
  gl={{
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
  }}
>
  <CabinetScene ... />
</Canvas>
```

`Canvas` performs the low-level work that the older ripple component performs manually:

1. creates a real `<canvas>` DOM element;
2. creates a `THREE.WebGLRenderer` and WebGL context;
3. creates a Three.js scene, camera, clock, and raycaster;
4. runs the animation/render loop;
5. updates the renderer when the canvas changes size;
6. connects browser pointer events to Three.js object intersections;
7. disposes declaratively created Three.js resources when they unmount.

### Renderer settings

- `shadows` enables Three.js shadow-map support.
- `dpr={[1, 1.75]}` caps rendering resolution at 1.75 physical pixels per CSS pixel. A Retina display may report a
  device pixel ratio of 2 or more, but rendering every pixel would cost considerably more GPU work.
- `alpha: true` lets the page background remain visible behind transparent canvas pixels.
- `antialias: true` smooths geometry edges using multisample antialiasing when the browser supports it.
- `preserveDrawingBuffer: true` keeps completed frames available for screenshots. It can reduce rendering efficiency;
  disabling it is an easy optimization if capture support stops being important.
- `powerPreference: 'high-performance'` asks the browser to prefer its high-performance graphics adapter. It is a hint,
  not a guarantee.

## 3. The scene graph describes ownership and transforms

Three.js stores the scene as a tree. Parent transforms affect every child:

```text
Scene
├── camera and lights
├── ArchitecturalCabinet
│   ├── back panel
│   ├── outer frame
│   ├── plinth
│   └── accent details
├── ArtifactSlot: OnlyScans
│   └── Float
│       ├── ProductBase
│       └── phone, screen, scan line, and documents
├── ArtifactSlot: Pitcher
├── ...five more ArtifactSlot groups
└── ContactShadows
```

If an `ArtifactSlot` moves or scales, every mesh inside that slot moves and scales with it. The individual artifact does
not need to know its carousel position.

This separation has two responsibilities:

- `ArtifactSlot` controls carousel layout, selection scale, depth, hover, and visibility.
- Each artifact component controls only its own product shape and small internal animation.

## 4. The architectural cabinet

`ArchitecturalCabinet` is a collection of Drei `RoundedBox` meshes:

- a graphite back wall;
- pale structural top and side members;
- a layered pale plinth and darker inset display surface;
- a cyan horizontal light strip;
- asymmetric white and yellow relief details.

Every rounded box produces geometry containing vertices, normals, triangle indices, and UV coordinates. The
`meshStandardMaterial` consumes its normals to calculate physically based lighting.

Properties such as `castShadow` and `receiveShadow` control whether a mesh participates in the shadow passes. They do
not create shadows by themselves; a shadow-casting light and renderer shadow support are also required.

## 5. The shared artifact design system

Every artifact is assembled from a small vocabulary:

- rounded matte housings;
- aluminum, off-white, and graphite materials;
- one project-specific Nord accent;
- a shared `ProductBase` with a small illuminated status strip;
- soft shadows and minimal idle movement.

`ProductBase` is an ordinary reusable React component, but its output is a Three.js group rather than DOM:

```tsx
const ProductBase = ({ accent }: { accent: string }) => (
  <group position={[0, -0.9, 0]}>
    <RoundedBox args={[2.45, 0.2, 1.8]} radius={0.14} castShadow receiveShadow>
      <meshStandardMaterial color={colors.graphite} roughness={0.42} metalness={0.12} />
    </RoundedBox>
    <RoundedBox args={[0.42, 0.07, 0.04]} position={[0, 0.01, 0.92]}>
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
    </RoundedBox>
  </group>
)
```

The visual meaning of the main material properties is:

- `color`: base surface color;
- `roughness`: how wide and soft reflections appear—higher values look more matte;
- `metalness`: whether reflections behave like metal rather than coated plastic;
- `emissive`: color the material appears to emit;
- `emissiveIntensity`: strength of that emission.

Emissive material does not automatically illuminate neighboring objects. It makes the surface itself bright. Actual
scene illumination still comes from the lights and environment.

## 6. How an artifact becomes GPU geometry

Take the OnlyScans phone housing:

```tsx
<RoundedBox args={[1.18, 1.9, 0.2]} radius={0.2} smoothness={6} castShadow>
  <meshStandardMaterial color={colors.graphite} roughness={0.28} metalness={0.18} />
</RoundedBox>
```

The path from JSX to pixels is:

1. React evaluates `OnlyScansArtifact`.
2. Fiber asks Drei's `RoundedBox` component to mount.
3. Drei constructs rounded `BufferGeometry` and a `THREE.Mesh`.
4. Fiber attaches the `MeshStandardMaterial` and copies the JSX properties onto the Three.js objects.
5. Three.js uploads the geometry attributes and triangle indices into WebGL buffers.
6. Three.js creates or reuses a shader program compatible with `MeshStandardMaterial`, active lights, environment,
   fog, and shadow settings.
7. On each frame, Three.js submits a draw call for the visible mesh.
8. The GPU transforms its vertices, rasterizes its triangles, shades the resulting fragments, depth-tests them, and
   writes surviving colors into the canvas framebuffer.

The app does not contain custom GLSL for these objects. Three.js generates the standard material shaders internally.
This is different from `RippleGrid.tsx`, where the GLSL source is written directly in the component.

## 7. Lighting and environment rendering

The cabinet combines several lighting techniques:

```tsx
<ambientLight intensity={1.1} />
<hemisphereLight color='#eceff4' groundColor='#2e3440' intensity={1.7} />
<directionalLight color='#eceff4' intensity={3.2} position={[3.5, 6, 5]} castShadow />
<spotLight color='#88c0d0' intensity={28} position={[-4, 3, 4]} />
```

- Ambient light adds the same minimum light everywhere.
- Hemisphere light provides different sky and ground colors, making forms easier to read.
- Directional light acts like a distant studio key light and renders the main shadow map.
- The cyan spotlight adds the Nord accent and stronger edge separation.

The `Environment` and `Lightformer` components create virtual studio softboxes:

```tsx
<Environment resolution={64}>
  <Lightformer form='rect' intensity={2.5} color='#eceff4' position={[0, 4, 5]} scale={[8, 2, 1]} />
  <Lightformer form='rect' intensity={1.5} color='#88c0d0' position={[-5, 1, 2]} scale={[2, 5, 1]} />
</Environment>
```

Drei renders these light shapes into a small environment map. Standard materials sample that map for soft reflections.
The lightformers are not meant to appear as cabinet objects; they appear in material reflections like large photography
softboxes.

## 8. Shadow passes

Shadows require additional rendering work.

### Directional shadow map

For the shadow-casting directional light, Three.js first renders relevant geometry from the light's point of view into a
depth texture. During the main color pass, materials compare their position with that texture to determine whether the
light is blocked.

### Contact shadows

`ContactShadows` creates the soft grounding beneath the artifacts:

```tsx
<ContactShadows
  position={[0, -1.16, 0]}
  opacity={0.48}
  scale={8}
  blur={2.6}
  far={4.5}
  color='#1d222c'
/>
```

Drei renders an offscreen depth view, blurs it, and projects the result onto a plane. It is visually effective for a
small product scene, but it costs extra render passes and GPU memory.

## 9. The camera and responsive layout

The camera uses perspective projection, so distant objects appear smaller:

```tsx
camera={{ fov: 36, near: 0.1, far: 50, position: [0, 1.25, 9.2] }}
```

- `fov` is the vertical field of view in degrees;
- `near` and `far` define the visible depth range;
- objects outside that range are clipped.

`ResponsiveCamera` moves the camera farther away on narrow screens:

```ts
camera.position.set(0, 1.25, size.width < 640 ? 14.5 : 9.2)
camera.lookAt(0, 0.15, 0)
camera.updateProjectionMatrix()
```

A mobile viewport has much less horizontal field of view. Moving the camera backward keeps the architectural frame and
side artifacts from being cropped.

## 10. The carousel animation loop

Fiber owns the browser's `requestAnimationFrame` loop. Components register per-frame work with `useFrame`:

```ts
useFrame((_, delta) => {
  // Mutate Three.js objects immediately before the frame is rendered.
})
```

`ArtifactSlot` calculates the shortest circular distance between itself and the selected project. That prevents the
seven-item carousel from rotating the long way around when wrapping from the last item to the first.

Its angle controls:

- horizontal position with `sin(angle)`;
- depth based on distance from the center;
- slight Y rotation;
- scale, making the active object dominant;
- visibility, so distant carousel objects are skipped by the renderer.

`MathUtils.damp` moves current values toward targets using `delta`, the elapsed seconds since the previous frame:

```ts
group.current.position.x = MathUtils.damp(
  group.current.position.x,
  Math.sin(angle) * 3.55,
  7,
  delta,
)
```

Using frame delta makes the animation behave consistently at 60 Hz, 120 Hz, or during occasional slow frames.

### Why refs are used instead of React state

Per-frame transforms are written directly to Three.js object refs. Updating React state 60 times per second would
re-render React components unnecessarily. React state is reserved for meaningful UI state such as `activeIndex` and
hover status.

The same rule applies to `dragOffset`: pointer movement writes into a ref, and the next GPU frame consumes it without a
React render between every pointer event.

## 11. Small object-specific animations

Each project can register its own `useFrame` callback:

- OnlyScans moves the scan line up and down.
- Pitcher pulses the sound-wave rings.
- MA Technix uses Drei `Float` for inventory cubes.
- What The Key offsets piano keys in a sequence.
- LidWatch slightly changes the screen angle.
- Every full artifact sits inside a restrained `Float` wrapper for shared idle movement.

These callbacks update transforms only. They do not rebuild geometry or create new materials per frame.

## 12. Clicking 3D objects

HTML click detection normally relies on DOM element rectangles. A WebGL canvas is only one DOM rectangle, so the
browser cannot know which triangle was clicked.

Fiber solves this with raycasting:

1. converts the pointer from canvas pixels into normalized device coordinates from `-1` to `1`;
2. creates a `THREE.Raycaster` ray from the camera through that screen position;
3. intersects the ray with scene geometry;
4. sends a React-like `ThreeEvent` to the closest intersected object.

That is why a Three.js group can declare normal-looking handlers:

```tsx
<group onClick={select} onPointerOver={...} onPointerOut={...}>
  <Artifact />
</group>
```

The click handler ignores events whose pointer traveled more than six pixels:

```ts
if (event.delta > 6) return
```

This prevents a carousel drag from accidentally selecting the mesh where the drag ended.

## 13. Drag and button navigation

Carousel dragging is handled by the regular DOM wrapper around the canvas. It records the pointer's starting X
coordinate and turns horizontal distance into an angular offset:

```ts
dragOffset.current =
  ((event.clientX - dragStart.current) / event.currentTarget.clientWidth) * 2.5
```

While the pointer moves, `ArtifactSlot` reads that offset in its next `useFrame`. On release, a movement over 45 pixels
selects the neighboring project. Smaller movement is left to Fiber's 3D click system.

The arrow and project-dot buttons update the same `activeIndex`. There is therefore one selection source regardless of
whether the visitor drags, clicks an artifact, presses an arrow, or presses a project dot.

Project descriptions, links, and technology pills remain normal HTML. This keeps text selection, links, keyboard
behavior, and accessibility semantics out of the GPU scene.

## 14. What the GPU does for one frame

Immediately before a frame:

1. Fiber runs every `useFrame` callback.
2. Three.js updates object world matrices and the camera matrix.
3. Three.js determines which objects are visible to the camera.
4. Shadow and contact-shadow passes render into offscreen textures when needed.
5. Three.js groups visible meshes by shader/material state and issues WebGL draw calls.

For a typical mesh, the GPU pipeline is:

### Vertex processing

The vertex shader reads each vertex position and normal from GPU buffers. It applies:

```text
local position
  -> model/world matrix
  -> camera/view matrix
  -> projection matrix
  -> clip-space position
```

Normals are transformed so lighting can be calculated in the chosen coordinate space.

### Primitive assembly and rasterization

The GPU assembles transformed vertices into triangles. Rasterization finds which screen pixels each triangle covers and
interpolates values such as normals, depth, and UV coordinates across those pixels.

### Fragment processing

Three.js's generated standard-material fragment shader combines:

- base color;
- surface normal;
- roughness and metalness;
- direct lights;
- environment reflection;
- shadow-map visibility;
- emissive color.

The depth test rejects fragments hidden behind closer geometry. Surviving fragments are blended into the framebuffer.

### Browser compositing

The WebGL framebuffer becomes the visual contents of the cabinet canvas. The browser compositor combines it with the
page's HTML details, controls, borders, and the separate ripple canvas before presenting the final screen image.

## 15. The page currently has two GPU canvases

The portfolio deliberately has two independent WebGL renderers:

| Canvas                    | Owner                    | Rendering approach                                      |
| ------------------------- | ------------------------ | ------------------------------------------------------- |
| Full-page grid/portrait   | `RippleGrid.tsx`         | Manual WebGL 2 setup and handwritten GLSL               |
| Project cabinet           | R3F `Canvas`              | Three.js scene, generated material shaders, and Drei     |

These canvases have separate WebGL contexts. They do not share geometries, textures, shader programs, framebuffers, or
GPU memory allocations. The browser compositor merely layers their finished images together.

Two contexts are reasonable here, but this is an important architectural limit. Browsers cap the number of active WebGL
contexts, and every context has independent overhead. If GPU profiling later shows excessive memory use or context
switching, the long-term solution is one shared Three.js renderer containing both a full-screen shader pass and the 3D
cabinet—not trying to share raw WebGL resources between two existing contexts.

## 16. Resource cleanup

In the old manual renderer, the component explicitly deleted shader programs, buffers, and textures. Fiber manages the
lifetime of declaratively created Three.js objects.

When the cabinet unmounts:

- React unmounts its R3F tree;
- Fiber removes scene objects and disposes supported geometries and materials;
- Drei cleans up its render targets and event handlers;
- Canvas disposes its renderer and render loop.

This automatic cleanup applies to declarative JSX objects. If a future feature manually creates textures, render
targets, controls, or objects outside the R3F tree, that feature must still call the appropriate `dispose()` method.

## 17. Current performance decisions

The implementation already limits several common costs:

- device pixel ratio is capped at `1.75`;
- far carousel artifacts set `visible = false`, so Three.js skips their draw calls;
- transforms are mutated through refs rather than React state every frame;
- environment resolution is only `64`;
- the scene uses simple procedural geometry rather than large downloaded models and textures;
- the product palette uses standard materials that Three.js can reuse shader programs for.

The expensive features are:

- multiple rounded meshes per artifact;
- directional shadow mapping;
- `ContactShadows` offscreen passes;
- environment-map generation;
- antialiasing and high-DPI rendering;
- a second WebGL context alongside the ripple background;
- `preserveDrawingBuffer: true` for screenshots.

If profiling shows a problem, optimize in this order:

1. disable `preserveDrawingBuffer` outside screenshot testing;
2. lower the DPR cap to `1.5` on small or slow devices;
3. reduce or disable `ContactShadows` on mobile;
4. reduce rounded-box smoothness and shadow-map cost;
5. render only while the cabinet is visible or interacting;
6. share repeated geometries/materials or instance repeated meshes;
7. consider merging the two canvases only if measurements justify the larger refactor.

## 18. Adding another project artifact

To add a new project:

1. Add the project record to `src/app/utils/projects.ts`.
2. Create a new artifact component in `ProjectArtifacts.tsx`.
3. Include the shared `ProductBase` and choose one Nord accent.
4. Build a recognizable silhouette with `RoundedBox` and Three.js primitives.
5. Use `useFrame` and refs only for motion that must update every frame.
6. Add the component to `artifactMap` using the exact project name.
7. Verify direct mesh clicking, dragging, arrow navigation, mobile framing, console errors, and a production build.

If the name is missing from `artifactMap`, `ArtifactSlot` intentionally returns `null`, so project details could change
without a corresponding 3D object. A missing object should therefore be checked there first.

## 19. Debugging checklist

### The canvas is blank

- Check the browser console for WebGL context or shader errors.
- Confirm the canvas has non-zero CSS width and height.
- Confirm the camera is aimed at the scene and the object is between its `near` and `far` planes.
- Check that the artifact name exactly matches an `artifactMap` key.

### An object is black or too dark

- Confirm it uses a lit material only when lights exist.
- Check its normals and material roughness/metalness.
- Temporarily use `meshBasicMaterial`, which ignores lighting, to separate geometry problems from lighting problems.

### An object cannot be clicked

- Confirm it contains raycastable meshes.
- Check whether another mesh is in front of it.
- Confirm the parent has not set `visible = false`.
- Check `event.delta` to distinguish a click from a drag.

### Mobile framing is cropped

- Inspect `ResponsiveCamera` first.
- Move the camera back before shrinking every artifact; one camera correction preserves the design system.

### Screenshots contain black tiles

Headless Chrome can expose GPU-compositor capture artifacts while a transparent WebGL scene is moving. Wait for the
carousel damping to settle, keep `preserveDrawingBuffer` enabled for capture, and compare with a software-composited
headless pass before assuming the real browser scene is broken.

### Performance drops

- Inspect draw calls, triangles, textures, and shader programs through `renderer.info` from Fiber's `gl` renderer.
- Compare performance with contact shadows disabled.
- Check whether both the ripple canvas and cabinet are rendering continuously.
- Profile on the actual target device instead of judging only from desktop development hardware.

## Glossary

- **Scene graph:** Tree of Three.js objects and parent-child transforms.
- **Mesh:** Renderable combination of geometry and material.
- **Geometry:** Vertex attributes and triangle indices describing shape.
- **Material:** Rendering rules and parameters used to build a shader program.
- **Shader:** GPU program for transforming vertices or calculating fragment colors.
- **Draw call:** One renderer command asking the GPU to draw geometry with a material.
- **Framebuffer:** GPU destination that stores rendered color, depth, and related data.
- **Render target:** Offscreen framebuffer, often used for shadows or post-processing.
- **Raycasting:** Testing a camera-to-pointer ray against 3D geometry.
- **DPR:** Ratio between CSS pixels and physical display pixels.
- **PBR:** Physically based rendering model used by standard materials.
- **R3F/Fiber:** React renderer that manages a Three.js scene graph.
- **Drei:** Helper components built for React Three Fiber.
- **ANGLE:** Translation layer commonly used by browsers to map WebGL to a native graphics API.
