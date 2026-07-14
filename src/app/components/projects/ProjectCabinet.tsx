'use client'

import type { BufferGeometry, Group, Material, Mesh, Object3D } from 'three'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/app/utils/projects'
import Mail from '../svg/Mail'

const wrap = (value: number, length: number) => (value + length) % length

const ProjectCabinet = ({ projects }: { projects: Project[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let stopped = false
    let cleanup = () => {}

    import('three').then(THREE => {
      if (stopped) return

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
      camera.position.set(0, 2.05, 7.7)
      camera.lookAt(0, 0.65, 0)

      scene.add(new THREE.HemisphereLight(0xd8dee9, 0x2e3440, 2.4))
      const keyLight = new THREE.DirectionalLight(0x88c0d0, 4)
      keyLight.position.set(3, 6, 5)
      keyLight.castShadow = true
      scene.add(keyLight)
      const fillLight = new THREE.PointLight(0x5e81ac, 12, 12)
      fillLight.position.set(-4, 2, 3)
      scene.add(fillLight)

      const cabinetMaterial = new THREE.MeshStandardMaterial({ color: 0x3b4252, roughness: 0.48, metalness: 0.5 })
      const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x88c0d0, roughness: 0.3, metalness: 0.75 })
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.22, 2.5), cabinetMaterial)
      shelf.position.y = -0.78
      shelf.receiveShadow = true
      scene.add(shelf)
      const trim = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.08, 2.58), trimMaterial)
      trim.position.y = -0.63
      scene.add(trim)

      const cabinetFrame = new THREE.Group()
      const frameGeometry = new THREE.BoxGeometry(0.13, 3.7, 0.13)
      for (const x of [-4.08, 4.08]) {
        const post = new THREE.Mesh(frameGeometry, cabinetMaterial)
        post.position.set(x, 1.04, -0.75)
        cabinetFrame.add(post)
      }
      const top = new THREE.Mesh(new THREE.BoxGeometry(8.3, 0.13, 0.13), cabinetMaterial)
      top.position.set(0, 2.86, -0.75)
      cabinetFrame.add(top)
      scene.add(cabinetFrame)

      const tag = (object: Object3D, projectIndex: number) => {
        object.traverse(child => (child.userData.projectIndex = projectIndex))
        return object
      }

      const makeOnlyScans = () => {
        const group = new THREE.Group()
        const paper = new THREE.MeshStandardMaterial({ color: 0xeceff4, roughness: 0.7 })
        const ink = new THREE.MeshStandardMaterial({ color: 0x5e81ac, roughness: 0.6 })
        const scanner = new THREE.MeshStandardMaterial({ color: 0x5e81ac, metalness: 0.55, roughness: 0.28 })
        for (let page = 0; page < 4; page++) {
          const sheet = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.035, 1.85), paper)
          sheet.position.set((page - 1.5) * 0.035, page * 0.055, 0)
          sheet.rotation.y = (page - 1.5) * 0.015
          sheet.castShadow = true
          group.add(sheet)
        }
        for (let line = 0; line < 4; line++) {
          const textLine = new THREE.Mesh(new THREE.BoxGeometry(0.82 - line * 0.08, 0.025, 0.035), ink)
          textLine.position.set(-0.12, 0.24, 0.45 - line * 0.22)
          group.add(textLine)
        }
        for (const x of [-0.82, 0.82]) {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.11, 1.25, 0.18), scanner)
          post.position.set(x, 0.78, 0)
          post.castShadow = true
          group.add(post)
        }
        const scannerTop = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.13, 0.2), scanner)
        scannerTop.position.y = 1.4
        scannerTop.castShadow = true
        group.add(scannerTop)
        const beamMaterial = new THREE.MeshBasicMaterial({ color: 0x8fbcbb, transparent: true, opacity: 0.8 })
        const beam = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.035, 0.12), beamMaterial)
        beam.position.y = 0.31
        beam.userData.scanBeam = true
        group.add(beam)
        group.rotation.x = -0.18
        return group
      }

      const makePitcher = () => {
        const group = new THREE.Group()
        const metal = new THREE.MeshStandardMaterial({ color: 0x81a1c1, metalness: 0.82, roughness: 0.2 })
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 1.2, 20), metal)
        stem.position.y = -0.3
        stem.castShadow = true
        group.add(stem)
        const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.18, 0.24), metal)
        shoulder.position.y = 0.25
        group.add(shoulder)
        for (const x of [-0.37, 0.37]) {
          const tine = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.35, 20), metal)
          tine.position.set(x, 0.86, 0)
          tine.castShadow = true
          group.add(tine)
          const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), metal)
          cap.position.set(x, 1.53, 0)
          group.add(cap)
        }
        const waveMaterial = new THREE.MeshBasicMaterial({ color: 0xb48ead, transparent: true, opacity: 0.55 })
        for (let ring = 0; ring < 3; ring++) {
          const wave = new THREE.Mesh(new THREE.TorusGeometry(1.05 + ring * 0.3, 0.025, 8, 64), waveMaterial)
          wave.rotation.x = Math.PI / 2
          wave.userData.waveRing = ring
          group.add(wave)
        }
        group.position.y = -0.1
        return group
      }

      const makeWhatTheKey = () => {
        const group = new THREE.Group()
        const white = new THREE.MeshStandardMaterial({ color: 0xeceff4, roughness: 0.4, metalness: 0.05 })
        const black = new THREE.MeshStandardMaterial({ color: 0x2e3440, roughness: 0.32, metalness: 0.35 })
        for (let key = 0; key < 7; key++) {
          const pianoKey = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 1.55), white.clone())
          pianoKey.position.set((key - 3) * 0.34, 0, 0)
          pianoKey.userData.pianoKey = key
          pianoKey.castShadow = true
          group.add(pianoKey)
        }
        for (const key of [0, 1, 3, 4, 5]) {
          const sharp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.92), black)
          sharp.position.set((key - 2.5) * 0.34, 0.16, -0.3)
          sharp.castShadow = true
          group.add(sharp)
        }
        const halo = new THREE.Mesh(
          new THREE.TorusGeometry(1.55, 0.035, 8, 80),
          new THREE.MeshBasicMaterial({ color: 0xebcb8b, transparent: true, opacity: 0.7 }),
        )
        halo.rotation.x = Math.PI / 2
        halo.position.y = -0.1
        halo.userData.keyHalo = true
        group.add(halo)
        group.rotation.x = -0.35
        return group
      }

      const makers = [makeOnlyScans, makePitcher, makeWhatTheKey]
      const artifacts = makers.map((make, index) => {
        const artifact = tag(make(), index) as Group
        scene.add(artifact)
        return artifact
      })

      const raycaster = new THREE.Raycaster()
      const pointer = new THREE.Vector2(4, 4)
      let hoveredIndex = -1
      let selectedIndex = 0
      let dragStart = 0
      let dragDistance = 0
      let dragging = false
      let animationFrame = 0
      const clock = new THREE.Clock()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const select = (index: number) => {
        selectedIndex = wrap(index, artifacts.length)
        activeIndexRef.current = selectedIndex
        setActiveIndex(selectedIndex)
      }

      const resize = () => {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.position.z = width < 640 ? 9.2 : 7.7
        camera.updateProjectionMatrix()
      }

      const pointerPosition = (event: PointerEvent) => {
        const bounds = canvas.getBoundingClientRect()
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
      }

      const handlePointerDown = (event: PointerEvent) => {
        pointerPosition(event)
        dragging = true
        dragStart = event.clientX
        dragDistance = 0
        canvas.setPointerCapture(event.pointerId)
      }
      const handlePointerMove = (event: PointerEvent) => {
        pointerPosition(event)
        if (dragging) dragDistance = event.clientX - dragStart
      }
      const handlePointerUp = (event: PointerEvent) => {
        if (!dragging) return
        dragging = false
        canvas.releasePointerCapture(event.pointerId)
        if (Math.abs(dragDistance) > 45) {
          select(selectedIndex - Math.sign(dragDistance))
          dragDistance = 0
          return
        }
        raycaster.setFromCamera(pointer, camera)
        const hit = raycaster.intersectObjects(artifacts, true)[0]
        if (hit) select(hit.object.userData.projectIndex)
        dragDistance = 0
      }

      canvas.addEventListener('pointerdown', handlePointerDown)
      canvas.addEventListener('pointermove', handlePointerMove)
      canvas.addEventListener('pointerup', handlePointerUp)
      canvas.addEventListener('pointercancel', handlePointerUp)
      window.addEventListener('resize', resize)
      resize()

      const animate = () => {
        const time = clock.getElapsedTime()
        selectedIndex = activeIndexRef.current
        const dragAngle = dragDistance / Math.max(canvas.clientWidth, 1) * 2.4

        raycaster.setFromCamera(pointer, camera)
        const hit = raycaster.intersectObjects(artifacts, true)[0]
        hoveredIndex = hit?.object.userData.projectIndex ?? -1
        canvas.style.cursor = dragging ? 'grabbing' : hoveredIndex >= 0 ? 'pointer' : 'grab'

        artifacts.forEach((artifact, index) => {
          const angle = (index - selectedIndex) * 1.02 + dragAngle
          const focus = Math.max(0, 1 - Math.abs(angle) * 0.45)
          const hover = hoveredIndex === index ? 1 : 0
          artifact.position.x += (Math.sin(angle) * 3.2 - artifact.position.x) * 0.09
          artifact.position.z += (-Math.abs(Math.sin(angle)) * 1.5 - artifact.position.z) * 0.09
          artifact.position.y = 0.25 + (reduceMotion ? 0 : Math.sin(time * 1.3 + index) * 0.07)
          const scale = 0.62 + focus * 0.7 + hover * 0.06
          artifact.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
          artifact.rotation.y += ((-angle * 0.22 + hover * 0.12) - artifact.rotation.y) * 0.08

          artifact.traverse(child => {
            if (child.userData.scanBeam) child.position.z = reduceMotion ? 0 : Math.sin(time * 1.8) * 0.72
            if (child.userData.waveRing !== undefined) {
              const ring = child.userData.waveRing as number
              child.rotation.z = reduceMotion ? 0 : time * (0.35 + ring * 0.12)
              const pulse = reduceMotion ? 1 : 1 + Math.sin(time * 2.6 - ring * 0.7) * 0.08
              child.scale.setScalar(pulse)
            }
            if (child.userData.pianoKey !== undefined) {
              const key = child.userData.pianoKey as number
              child.position.y = reduceMotion ? 0 : Math.max(0, Math.sin(time * 2.5 - key * 0.55)) * 0.08
            }
            if (child.userData.keyHalo) child.rotation.z = reduceMotion ? 0 : time * 0.3
          })
        })

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        canvas.removeEventListener('pointerdown', handlePointerDown)
        canvas.removeEventListener('pointermove', handlePointerMove)
        canvas.removeEventListener('pointerup', handlePointerUp)
        canvas.removeEventListener('pointercancel', handlePointerUp)
        window.removeEventListener('resize', resize)
        const geometries = new Set<BufferGeometry>()
        const materials = new Set<Material>()
        scene.traverse(object => {
          const mesh = object as Mesh
          if (mesh.geometry) geometries.add(mesh.geometry)
          if (mesh.material) {
            const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
            meshMaterials.forEach(material => materials.add(material))
          }
        })
        geometries.forEach(geometry => geometry.dispose())
        materials.forEach(material => material.dispose())
        renderer.dispose()
      }
    })

    return () => {
      stopped = true
      cleanup()
    }
  }, [projects.length])

  const selectProject = (index: number) => {
    activeIndexRef.current = wrap(index, projects.length)
    setActiveIndex(activeIndexRef.current)
  }
  const acquisition = activeProject.acquireInfo[0]

  return (
    <div
      data-project-cabinet
      className='overflow-hidden rounded-2xl border border-nord-main-border bg-nord-accent-1/80 shadow-2xl'
    >
      <div className='relative h-[390px] sm:h-[460px]'>
        <canvas
          ref={canvasRef}
          className='h-full w-full touch-none'
          aria-label='Interactive 3D project cabinet. Drag to rotate between projects.'
        />
        <div className='pointer-events-none absolute inset-x-0 top-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-nord-highlight-2/80'>
          Drag the cabinet · select an artifact
        </div>
        <button
          type='button'
          onClick={() => selectProject(activeIndex - 1)}
          className='absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-nord-main-border bg-nord-surface/80 text-2xl text-nord-text-primary backdrop-blur hover:border-nord-highlight-2'
          aria-label='Previous project'
        >
          ‹
        </button>
        <button
          type='button'
          onClick={() => selectProject(activeIndex + 1)}
          className='absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-nord-main-border bg-nord-surface/80 text-2xl text-nord-text-primary backdrop-blur hover:border-nord-highlight-2'
          aria-label='Next project'
        >
          ›
        </button>
      </div>

      <div className='border-t border-nord-main-border px-5 py-5 sm:px-8'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-2xl'>
            <div className='mb-2 flex gap-2' role='tablist' aria-label='Cabinet projects'>
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  type='button'
                  role='tab'
                  aria-selected={activeIndex === index}
                  onClick={() => selectProject(index)}
                  className={`h-1.5 rounded-full transition-all ${activeIndex === index ? 'w-8 bg-nord-highlight-2' : 'w-4 bg-nord-main-border hover:bg-nord-highlight-1'}`}
                  aria-label={`Show ${project.name}`}
                />
              ))}
            </div>
            <h3 className='text-2xl font-bold text-nord-text-primary'>{activeProject.name}</h3>
            <p className='mt-1 text-sm leading-6 text-nord-text-secondary'>{activeProject.description}</p>
            <div className='mt-3 flex flex-wrap gap-2'>
              {activeProject.stack.map(tech => (
                <Link
                  key={tech.name}
                  href={tech.docs}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs font-semibold text-nord-highlight-2 hover:text-nord-highlight-3'
                >
                  {tech.name}
                </Link>
              ))}
            </div>
          </div>

          {acquisition.type === 'website' && acquisition.link ? (
            <Link
              href={acquisition.link}
              target='_blank'
              rel='noopener noreferrer'
              className='shrink-0 rounded-lg bg-nord-highlight-2 px-5 py-3 text-center text-sm font-bold text-nord-surface hover:bg-nord-highlight-3'
            >
              Visit Project
            </Link>
          ) : (
            <Link
              href='mailto:kristijankocev1234@gmail.com'
              className='inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-nord-text-primary px-5 py-3 text-sm font-bold text-nord-surface hover:opacity-90'
            >
              <Mail fill='#2E3440' size={18} /> Contact Me
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCabinet
