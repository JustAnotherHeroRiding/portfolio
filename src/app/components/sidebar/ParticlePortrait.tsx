'use client'

import { useEffect, useRef } from 'react'

const SIZE = 180
const TILE_SIZE = 6

const ParticlePortrait = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const image = new window.Image()
    const cursor = { x: SIZE / 2, y: SIZE / 2 }
    const clickPoint = { x: SIZE / 2, y: SIZE / 2 }
    const startedAt = performance.now()
    let movedAt = startedAt - 10000
    let clickedAt = startedAt - 10000
    let hoverStrength = 0
    let clickStrength = 0
    let pixelRatio = 1
    let frame = 0
    let running = false
    let ready = false

    const draw = (now: number) => {
      running = false
      if (!ready) return

      const time = (now - startedAt) / 1000
      const hoverFade = Math.max(0, 1 - (now - movedAt) / 1400)
      const clickTime = (now - clickedAt) / 1000

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, SIZE, SIZE)
      context.save()
      context.beginPath()
      context.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2)
      context.clip()

      for (let sourceY = 0; sourceY < SIZE; sourceY += TILE_SIZE) {
        for (let sourceX = 0; sourceX < SIZE; sourceX += TILE_SIZE) {
          const x = sourceX + TILE_SIZE / 2
          const y = sourceY + TILE_SIZE / 2
          const cursorX = x - cursor.x
          const cursorY = y - cursor.y
          const cursorDistance = Math.hypot(cursorX, cursorY)
          const hoverWave =
            Math.sin(cursorDistance / 8 - time * 5) *
            Math.exp(-cursorDistance / 150) *
            hoverStrength *
            hoverFade

          const clickX = x - clickPoint.x
          const clickY = y - clickPoint.y
          const clickDistance = Math.hypot(clickX, clickY)
          const ringDistance = clickDistance - clickTime * 240
          const clickWave =
            clickTime < 2.5
              ? Math.sin(ringDistance / 5) *
                Math.exp(-Math.abs(ringDistance) / 45) *
                Math.exp(-clickTime * 0.5) *
                clickStrength
              : 0

          const hoverOffset = hoverWave * 7
          const clickOffset = clickWave * 12
          const destinationX =
            sourceX +
            (cursorX / Math.max(cursorDistance, 0.001)) * hoverOffset +
            (clickX / Math.max(clickDistance, 0.001)) * clickOffset
          const destinationY =
            sourceY +
            (cursorY / Math.max(cursorDistance, 0.001)) * hoverOffset +
            (clickY / Math.max(clickDistance, 0.001)) * clickOffset

          context.drawImage(
            image,
            (sourceX / SIZE) * image.naturalWidth,
            (sourceY / SIZE) * image.naturalHeight,
            (TILE_SIZE / SIZE) * image.naturalWidth,
            (TILE_SIZE / SIZE) * image.naturalHeight,
            destinationX - 0.4,
            destinationY - 0.4,
            TILE_SIZE + 0.8,
            TILE_SIZE + 0.8,
          )
        }
      }
      context.restore()

      if (now - movedAt < 1400 || clickTime < 2.5) {
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

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      const nearestX = Math.max(bounds.left, Math.min(event.clientX, bounds.right))
      const nearestY = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom))
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY)
      const proximity = Math.max(0, 1 - distance / 700)

      cursor.x = event.clientX - bounds.left
      cursor.y = event.clientY - bounds.top
      hoverStrength = proximity * proximity * proximity
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
      clickStrength = 0.3 + proximity * proximity * proximity * 0.7
      clickedAt = performance.now()
      start()
    }
    const handleResize = () => {
      pixelRatio = Math.min(window.devicePixelRatio, 2)
      canvas.width = SIZE * pixelRatio
      canvas.height = SIZE * pixelRatio
      draw(performance.now())
    }

    image.onload = () => {
      ready = true
      handleResize()
    }
    image.src = '/images/me.png'

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='relative h-[180px] w-[180px] rounded-full bg-[url(/images/me.png)] bg-cover bg-center'
      data-ripple-origin
    >
      <canvas
        ref={canvasRef}
        className='pointer-events-none absolute inset-0 h-full w-full rounded-full'
        aria-label='Interactive water ripple portrait of Kristijan Kocev'
        role='img'
      />
    </div>
  )
}

export default ParticlePortrait
