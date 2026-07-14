'use client'

import { useEffect, useRef } from 'react'

const vertexShaderSource = `#version 300 es
  in vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `#version 300 es
  precision highp float;

  uniform sampler2D portrait;
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
  out vec4 outputColor;

  vec2 waveOffset(vec2 point) {
    vec2 cursorDelta = point - cursor;
    float cursorDistance = length(cursorDelta) / pixelRatio;
    float hoverWave = sin(cursorDistance / 15.0 - time * 5.0)
      * exp(-cursorDistance / 320.0)
      * hoverStrength;

    vec2 clickDelta = point - clickPoint;
    float clickDistance = length(clickDelta) / pixelRatio;
    float ringDistance = clickDistance - clickTime * 430.0;
    float clickWave = clickTime < 3.0
      ? sin(ringDistance / 10.0)
        * exp(-abs(ringDistance) / 70.0)
        * exp(-clickTime * 0.45)
        * clickStrength
      : 0.0;

    vec2 hoverDirection = cursorDelta / max(length(cursorDelta), 0.001);
    vec2 clickDirection = clickDelta / max(length(clickDelta), 0.001);
    return (hoverDirection * hoverWave * 10.0 + clickDirection * clickWave * 18.0) * pixelRatio;
  }

  void main() {
    vec2 point = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
    vec2 offset = waveOffset(point);
    vec2 warpedPoint = point + offset;
    float gridSize = 40.0 * pixelRatio;
    vec2 gridCell = mod(warpedPoint, gridSize);
    vec2 lineDistance = min(gridCell, gridSize - gridCell);
    float gridLine = 1.0 - smoothstep(0.7 * pixelRatio, 1.4 * pixelRatio, min(lineDistance.x, lineDistance.y));
    vec3 background = vec3(0.180, 0.204, 0.251);
    vec3 grid = vec3(0.23137, 0.25882, 0.32157);
    vec3 color = mix(background, grid, gridLine);

    vec2 portraitUv = (point - portraitOrigin) / portraitSize;
    float portraitMask = 1.0 - smoothstep(0.492, 0.505, length(portraitUv - 0.5));
    if (portraitMask > 0.0) {
      vec2 distortedUv = clamp(portraitUv + offset * 1.8 / portraitSize, 0.0, 1.0);
      vec3 portraitColor = texture(portrait, distortedUv).rgb;
      color = mix(color, portraitColor, portraitMask);
    }

    outputColor = vec4(color, 1.0);
  }
`

const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
  return null
}

const RippleGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl2', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    })
    if (!canvas || !gl) return

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      cursor: gl.getUniformLocation(program, 'cursor'),
      clickPoint: gl.getUniformLocation(program, 'clickPoint'),
      portraitOrigin: gl.getUniformLocation(program, 'portraitOrigin'),
      portraitSize: gl.getUniformLocation(program, 'portraitSize'),
      pixelRatio: gl.getUniformLocation(program, 'pixelRatio'),
      time: gl.getUniformLocation(program, 'time'),
      clickTime: gl.getUniformLocation(program, 'clickTime'),
      hoverStrength: gl.getUniformLocation(program, 'hoverStrength'),
      clickStrength: gl.getUniformLocation(program, 'clickStrength'),
    }

    const cursor = { x: 0, y: 0 }
    const clickPoint = { x: 0, y: 0 }
    const portraitBounds = { left: 0, top: 0, right: 0, bottom: 0, width: 1, height: 1 }
    const startedAt = performance.now()
    let movedAt = startedAt - 10000
    let clickedAt = startedAt - 10000
    let hoverStrength = 0
    let clickStrength = 0
    let pixelRatio = 1
    let frame = 0
    let running = false
    let ready = false
    let portraitElement: HTMLElement | null = null

    const updatePortrait = () => {
      portraitElement = document.querySelector('[data-ripple-origin]')
      if (!portraitElement) return
      const bounds = portraitElement.getBoundingClientRect()
      portraitBounds.left = bounds.left
      portraitBounds.top = bounds.top
      portraitBounds.right = bounds.right
      portraitBounds.bottom = bounds.bottom
      portraitBounds.width = bounds.width
      portraitBounds.height = bounds.height
    }

    const draw = (now: number) => {
      running = false
      if (!ready) return

      const hoverFade = Math.max(0, 1 - (now - movedAt) / 1400)
      const clickTime = (now - clickedAt) / 1000
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.cursor, cursor.x * pixelRatio, cursor.y * pixelRatio)
      gl.uniform2f(uniforms.clickPoint, clickPoint.x * pixelRatio, clickPoint.y * pixelRatio)
      gl.uniform2f(uniforms.portraitOrigin, portraitBounds.left * pixelRatio, portraitBounds.top * pixelRatio)
      gl.uniform2f(uniforms.portraitSize, portraitBounds.width * pixelRatio, portraitBounds.height * pixelRatio)
      gl.uniform1f(uniforms.pixelRatio, pixelRatio)
      gl.uniform1f(uniforms.time, (now - startedAt) / 1000)
      gl.uniform1f(uniforms.clickTime, clickTime)
      gl.uniform1f(uniforms.hoverStrength, hoverStrength * hoverFade)
      gl.uniform1f(uniforms.clickStrength, clickStrength)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (now - movedAt < 1400 || clickTime < 3) {
        running = true
        frame = requestAnimationFrame(draw)
      }
    }

    const start = () => {
      if (!running) {
        running = true
        frame = requestAnimationFrame(draw)
      }
    }

    const proximityToPortrait = (event: PointerEvent) => {
      const nearestX = Math.max(portraitBounds.left, Math.min(event.clientX, portraitBounds.right))
      const nearestY = Math.max(portraitBounds.top, Math.min(event.clientY, portraitBounds.bottom))
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY)
      return Math.max(0, 1 - distance / 700)
    }
    const updatePointer = (event: PointerEvent) => {
      cursor.x = event.clientX
      cursor.y = event.clientY
      const proximity = proximityToPortrait(event)
      hoverStrength = 0.15 + proximity * proximity * proximity * 0.85
      movedAt = performance.now()
      return proximity
    }
    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event)
      start()
    }
    const handlePointerDown = (event: PointerEvent) => {
      const proximity = updatePointer(event)
      clickPoint.x = cursor.x
      clickPoint.y = cursor.y
      clickStrength = 0.4 + proximity * proximity * proximity * 0.6
      clickedAt = performance.now()
      start()
    }
    const handleResize = () => {
      pixelRatio = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
      updatePortrait()
      draw(performance.now())
    }
    const handleScroll = () => {
      updatePortrait()
      start()
    }

    const image = new window.Image()
    image.onload = () => {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform1i(gl.getUniformLocation(program, 'portrait'), 0)
      updatePortrait()
      if (portraitElement) portraitElement.style.backgroundImage = 'none'
      ready = true
      handleResize()
    }
    image.src = '/images/me.png'

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      if (portraitElement) portraitElement.style.backgroundImage = ''
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <div
      className='pointer-events-none fixed inset-0 z-0 bg-nord-surface'
      style={{
        backgroundImage:
          'linear-gradient(rgba(76, 86, 106, 0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 86, 106, 0.28) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
      aria-hidden='true'
    >
      <canvas ref={canvasRef} className='h-full w-full' />
    </div>
  )
}

export default RippleGrid
