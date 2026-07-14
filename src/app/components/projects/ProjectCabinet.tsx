'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import { PointerEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { AcquireInfo, Project } from '@/app/utils/projects'
import Mail from '../svg/Mail'
import { ArtifactSlot } from './ProjectArtifacts'

const wrap = (value: number, length: number) => (value + length) % length
type CabinetProject = Pick<Project, 'name' | 'description' | 'stack'> & {
  acquireInfo: Pick<AcquireInfo, 'type' | 'link'>[]
}

const ResponsiveCamera = () => {
  const { camera, size } = useThree()

  useEffect(() => {
    camera.position.set(0, 1.25, size.width < 640 ? 14.5 : 9.2)
    camera.lookAt(0, 0.15, 0)
    camera.updateProjectionMatrix()
  }, [camera, size.width])

  return null
}

const ArchitecturalCabinet = () => (
  <group position={[0, 0.05, 0]}>
    <RoundedBox args={[8.8, 4.65, 0.28]} radius={0.18} smoothness={6} position={[0, 0.42, -2.28]} receiveShadow>
      <meshStandardMaterial color='#3b4252' roughness={0.66} />
    </RoundedBox>

    <RoundedBox args={[8.95, 0.42, 0.9]} radius={0.16} smoothness={6} position={[0, 2.58, -1.85]} castShadow>
      <meshStandardMaterial color='#d8dee9' roughness={0.5} />
    </RoundedBox>
    <RoundedBox args={[0.42, 4.45, 0.9]} radius={0.16} smoothness={6} position={[-4.27, 0.42, -1.85]} castShadow>
      <meshStandardMaterial color='#d8dee9' roughness={0.5} />
    </RoundedBox>
    <RoundedBox args={[0.42, 4.45, 0.9]} radius={0.16} smoothness={6} position={[4.27, 0.42, -1.85]} castShadow>
      <meshStandardMaterial color='#d8dee9' roughness={0.5} />
    </RoundedBox>

    <RoundedBox args={[9.05, 0.5, 3.35]} radius={0.2} smoothness={6} position={[0, -1.5, -0.45]} castShadow receiveShadow>
      <meshStandardMaterial color='#d8dee9' roughness={0.46} />
    </RoundedBox>
    <RoundedBox args={[8.55, 0.18, 2.92]} radius={0.09} smoothness={5} position={[0, -1.19, -0.38]} receiveShadow>
      <meshStandardMaterial color='#4c566a' roughness={0.5} />
    </RoundedBox>
    <RoundedBox args={[6.1, 0.11, 0.07]} radius={0.045} smoothness={4} position={[0.72, -1.33, 1.25]}>
      <meshStandardMaterial color='#88c0d0' emissive='#88c0d0' emissiveIntensity={0.18} />
    </RoundedBox>

    <RoundedBox args={[0.24, 3.1, 0.16]} radius={0.1} smoothness={5} position={[-3.22, 0.25, -2.06]}>
      <meshStandardMaterial color='#eceff4' roughness={0.55} />
    </RoundedBox>
    <RoundedBox args={[1.55, 0.18, 0.18]} radius={0.08} smoothness={5} position={[3.05, 1.75, -2.04]}>
      <meshStandardMaterial color='#ebcb8b' roughness={0.48} />
    </RoundedBox>
    <RoundedBox args={[0.18, 0.86, 0.18]} radius={0.08} smoothness={5} position={[3.72, 1.4, -2.04]}>
      <meshStandardMaterial color='#ebcb8b' roughness={0.48} />
    </RoundedBox>
  </group>
)

const CabinetScene = ({
  projects,
  activeIndex,
  dragOffset,
  onSelect,
}: {
  projects: CabinetProject[]
  activeIndex: number
  dragOffset: React.MutableRefObject<number>
  onSelect: (index: number) => void
}) => (
  <>
    <ResponsiveCamera />
    <ambientLight intensity={1.1} />
    <hemisphereLight color='#eceff4' groundColor='#2e3440' intensity={1.7} />
    <directionalLight color='#eceff4' intensity={3.2} position={[3.5, 6, 5]} castShadow />
    <spotLight color='#88c0d0' intensity={28} angle={0.42} penumbra={0.8} position={[-4, 3, 4]} />
    <Environment resolution={64}>
      <Lightformer form='rect' intensity={2.5} color='#eceff4' position={[0, 4, 5]} scale={[8, 2, 1]} />
      <Lightformer form='rect' intensity={1.5} color='#88c0d0' position={[-5, 1, 2]} scale={[2, 5, 1]} />
    </Environment>

    <ArchitecturalCabinet />
    {projects.map((project, index) => (
      <ArtifactSlot
        key={project.name}
        name={project.name}
        index={index}
        count={projects.length}
        activeIndex={activeIndex}
        dragOffset={dragOffset}
        onSelect={onSelect}
      />
    ))}
    <ContactShadows position={[0, -1.16, 0]} opacity={0.48} scale={8} blur={2.6} far={4.5} color='#1d222c' />
  </>
)

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg className='block size-5' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path
      d={direction === 'left' ? 'M14.5 5 7.5 12l7 7' : 'm9.5 5 7 7-7 7'}
      stroke='currentColor'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ProjectCabinet = ({ projects }: { projects: CabinetProject[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const dragStart = useRef<number | null>(null)
  const dragOffset = useRef(0)
  const activeProject = projects[activeIndex]

  const selectProject = (index: number) => {
    dragOffset.current = 0
    setActiveIndex(wrap(index, projects.length))
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    dragOffset.current = ((event.clientX - dragStart.current) / event.currentTarget.clientWidth) * 2.5
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    const distance = event.clientX - dragStart.current
    dragStart.current = null
    dragOffset.current = 0
    if (Math.abs(distance) > 45) selectProject(activeIndex - Math.sign(distance))
  }

  const acquisition = activeProject.acquireInfo[0]

  return (
    <div
      data-project-cabinet
      className='overflow-hidden rounded-2xl border border-nord-main-border bg-nord-accent-1/85 shadow-2xl'
    >
      <div
        className='relative h-[400px] touch-none sm:h-[500px]'
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ fov: 36, near: 0.1, far: 50, position: [0, 1.25, 9.2] }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
          aria-label='Interactive 3D project cabinet. Drag to rotate between projects.'
        >
          <CabinetScene projects={projects} activeIndex={activeIndex} dragOffset={dragOffset} onSelect={selectProject} />
        </Canvas>

        <div className='pointer-events-none absolute inset-x-0 top-4 text-center text-xs font-semibold tracking-[0.18em] text-nord-highlight-2/90'>
          Drag the cabinet · select an artifact
        </div>
        <button
          type='button'
          onPointerDown={event => event.stopPropagation()}
          onClick={() => selectProject(activeIndex - 1)}
          className='absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-nord-main-border bg-nord-surface/85 text-nord-text-primary backdrop-blur transition-colors hover:border-nord-highlight-2'
          aria-label='Previous project'
        >
          <Chevron direction='left' />
        </button>
        <button
          type='button'
          onPointerDown={event => event.stopPropagation()}
          onClick={() => selectProject(activeIndex + 1)}
          className='absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-nord-main-border bg-nord-surface/85 text-nord-text-primary backdrop-blur transition-colors hover:border-nord-highlight-2'
          aria-label='Next project'
        >
          <Chevron direction='right' />
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
                  className='flex items-center gap-2 rounded-full border border-nord-main-border bg-nord-accent-1 px-3 py-1.5 transition-colors hover:border-nord-highlight-2'
                  title={tech.name}
                >
                  <img src={tech.logoUrl} width={20} height={20} alt={`${tech.name} Logo`} className='rounded' />
                  <span className='text-sm font-medium text-nord-text-secondary'>{tech.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {acquisition.type === 'website' && acquisition.link ? (
            <Link
              href={acquisition.link}
              target='_blank'
              rel='noopener noreferrer'
              className='shrink-0 rounded-full bg-nord-highlight-2 px-5 py-3 text-center text-sm font-bold text-nord-surface transition-colors hover:bg-nord-highlight-3'
            >
              Visit Project
            </Link>
          ) : (
            <Link
              href='mailto:kristijankocev1234@gmail.com'
              className='inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-nord-text-primary px-5 py-3 text-sm font-bold text-nord-surface hover:opacity-90'
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
