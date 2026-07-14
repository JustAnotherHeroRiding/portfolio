'use client'

import { useEffect, useRef } from 'react'

const GRID_SIZE = 40
const LINE_STEP = 16

const RippleGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const cursor = { x: 0, y: 0 }
    const clickPoint = { x: 0, y: 0 }
    const startedAt = performance.now()
    let movedAt = startedAt - 10000
    let clickedAt = startedAt - 10000
    let hoverStrength = 0
    let clickStrength = 0
    let width = 0
    let height = 0
    let pixelRatio = 1
    let frame = 0
    let running = false

    const distort = (x: number, y: number, now: number) => {
      const time = (now - startedAt) / 1000
      const hoverFade = Math.max(0, 1 - (now - movedAt) / 1400)
      const cursorX = x - cursor.x
      const cursorY = y - cursor.y
      const cursorDistance = Math.hypot(cursorX, cursorY)
      const hoverWave =
        Math.sin(cursorDistance / 15 - time * 5) *
        Math.exp(-cursorDistance / 320) *
        hoverStrength *
        hoverFade

      const clickTime = (now - clickedAt) / 1000
      const clickX = x - clickPoint.x
      const clickY = y - clickPoint.y
      const clickDistance = Math.hypot(clickX, clickY)
      const ringDistance = clickDistance - clickTime * 430
      const clickWave =
        clickTime < 3
          ? Math.sin(ringDistance / 10) *
            Math.exp(-Math.abs(ringDistance) / 70) *
            Math.exp(-clickTime * 0.45) *
            clickStrength
          : 0

      return {
        x: x + (cursorX / Math.max(cursorDistance, 0.001)) * hoverWave * 10 + (clickX / Math.max(clickDistance, 0.001)) * clickWave * 18,
        y: y + (cursorY / Math.max(cursorDistance, 0.001)) * hoverWave * 10 + (clickY / Math.max(clickDistance, 0.001)) * clickWave * 18,
      }
    }

    const draw = (now: number) => {
      running = false
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#2E3440'
      context.fillRect(0, 0, width, height)
      context.strokeStyle = '#4C566A'
      context.lineWidth = 1
      context.lineJoin = 'round'

      for (let x = 0; x <= width; x += GRID_SIZE) {
        context.beginPath()
        for (let y = 0; y <= height; y += LINE_STEP) {
          const point = distort(x, y, now)
          if (y === 0) context.moveTo(point.x, point.y)
          else context.lineTo(point.x, point.y)
        }
        context.stroke()
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        context.beginPath()
        for (let x = 0; x <= width; x += LINE_STEP) {
          const point = distort(x, y, now)
          if (x === 0) context.moveTo(point.x, point.y)
          else context.lineTo(point.x, point.y)
        }
        context.stroke()
      }

      const hoverActive = now - movedAt < 1400
      const clickActive = now - clickedAt < 3000
      if (hoverActive || clickActive) {
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
      const portrait = document.querySelector('[data-ripple-origin]')
      if (!portrait) return 0
      const bounds = portrait.getBoundingClientRect()
      const nearestX = Math.max(bounds.left, Math.min(event.clientX, bounds.right))
      const nearestY = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom))
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
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      draw(performance.now())
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='pointer-events-none fixed inset-0 z-0'
      style={{
        backgroundColor: '#2E3440',
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
