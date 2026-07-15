'use client'

import { Float, Line, RoundedBox } from '@react-three/drei'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { MutableRefObject, useRef, useState } from 'react'
import { Group, MathUtils, Mesh } from 'three'

const colors = {
  white: '#eceff4',
  aluminum: '#d8dee9',
  graphite: '#2e3440',
  dark: '#3b4252',
  cyan: '#88c0d0',
  blue: '#5e81ac',
  green: '#a3be8c',
  yellow: '#ebcb8b',
  orange: '#d08770',
  red: '#bf616a',
  purple: '#b48ead',
}

const ProductBase = ({ accent }: { accent: string }) => (
  <group position={[0, -0.9, 0]}>
    <RoundedBox args={[2.45, 0.18, 1.8]} radius={0.05} smoothness={1} castShadow receiveShadow>
      <meshStandardMaterial color={colors.graphite} roughness={0.78} />
    </RoundedBox>
    <RoundedBox args={[0.42, 0.06, 0.04]} radius={0.02} smoothness={1} position={[0, 0, 0.92]}>
      <meshStandardMaterial color={accent} roughness={0.65} />
    </RoundedBox>
  </group>
)

const OnlyScansArtifact = () => {
  const scanLine = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (scanLine.current) scanLine.current.position.y = 0.25 + Math.sin(clock.elapsedTime * 1.8) * 0.48
  })

  return (
    <group>
      <ProductBase accent={colors.cyan} />
      <group position={[0, 0.2, 0]} rotation={[0.03, -0.08, 0]}>
        <RoundedBox args={[1.18, 1.9, 0.2]} radius={0.08} smoothness={1} castShadow>
          <meshStandardMaterial color={colors.graphite} roughness={0.78} />
        </RoundedBox>
        <RoundedBox args={[0.98, 1.55, 0.04]} radius={0.035} smoothness={1} position={[0, 0, 0.12]}>
          <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
        </RoundedBox>
        <mesh position={[-0.36, 0.58, 0.16]}>
          <circleGeometry args={[0.055, 8]} />
          <meshStandardMaterial color={colors.dark} />
        </mesh>
        <RoundedBox
          ref={scanLine}
          args={[0.82, 0.045, 0.025]}
          radius={0.01}
          smoothness={1}
          position={[0, 0.25, 0.16]}
        >
          <meshStandardMaterial color={colors.cyan} roughness={0.58} />
        </RoundedBox>
      </group>
      <group position={[0, -0.55, 0.52]} rotation={[-0.3, 0, 0]}>
        {[0, 1].map(page => (
          <RoundedBox
            key={page}
            args={[1.5, 0.055, 1.05]}
            radius={0.025}
            smoothness={1}
            position={[(page - 0.5) * 0.035, page * 0.055, 0]}
            castShadow
          >
            <meshStandardMaterial color={colors.white} roughness={0.68} />
          </RoundedBox>
        ))}
        {[0.14, -0.12].map((z, index) => (
          <RoundedBox key={z} args={[0.82 - index * 0.14, 0.018, 0.035]} radius={0.005} smoothness={1} position={[-0.18, 0.13, z]}>
            <meshStandardMaterial color={colors.blue} />
          </RoundedBox>
        ))}
      </group>
    </group>
  )
}

const PitcherArtifact = () => {
  const waves = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!waves.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.06
    waves.current.scale.setScalar(pulse)
  })

  return (
    <group>
      <ProductBase accent={colors.purple} />
      <group position={[0, -0.05, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 1.1, 8]} />
          <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
        </mesh>
        <RoundedBox args={[0.95, 0.2, 0.28]} radius={0.035} smoothness={1} position={[0, 0.18, 0]} castShadow>
          <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
        </RoundedBox>
        {[-0.37, 0.37].map(x => (
          <group key={x}>
            <mesh position={[x, 0.82, 0]} castShadow>
              <cylinderGeometry args={[0.105, 0.105, 1.35, 8]} />
              <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
            </mesh>
            <mesh position={[x, 1.5, 0]}>
              <sphereGeometry args={[0.105, 8, 5]} />
              <meshStandardMaterial color={colors.cyan} roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={waves} position={[0, -0.02, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.18, 0.035, 4, 16]} />
          <meshStandardMaterial color={colors.purple} roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

const WiseMarginArtifact = () => (
  <group>
    <ProductBase accent={colors.green} />
    <RoundedBox args={[2, 1.45, 0.28]} radius={0.06} smoothness={1} position={[0, 0.25, 0]} castShadow>
      <meshStandardMaterial color={colors.white} roughness={0.82} />
    </RoundedBox>
    <RoundedBox args={[1.68, 1.12, 0.04]} radius={0.025} smoothness={1} position={[0, 0.25, 0.17]}>
      <meshStandardMaterial color={colors.dark} roughness={0.82} />
    </RoundedBox>
    {[0.38, 0.65, 0.92, 1.22].map((height, index) => (
      <RoundedBox
        key={height}
        args={[0.24, height, 0.08]}
        radius={0.018}
        smoothness={1}
        position={[-0.55 + index * 0.37, -0.2 + height / 2, 0.23]}
        castShadow
      >
        <meshStandardMaterial color={index === 3 ? colors.green : colors.cyan} roughness={0.34} />
      </RoundedBox>
    ))}
    <mesh position={[0.75, -0.63, 0.2]}>
      <circleGeometry args={[0.09, 8]} />
      <meshStandardMaterial color={colors.green} roughness={0.65} />
    </mesh>
  </group>
)

const MATechnixArtifact = () => (
  <group>
    <ProductBase accent={colors.green} />
    <RoundedBox args={[1.85, 1.15, 1.25]} radius={0.05} smoothness={1} position={[0, -0.1, 0]} castShadow>
      <meshStandardMaterial color={colors.graphite} roughness={0.82} />
    </RoundedBox>
    <RoundedBox args={[1.65, 0.16, 1.05]} radius={0.025} smoothness={1} position={[0, 0.56, -0.08]} rotation={[-0.18, 0, 0]} castShadow>
      <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
    </RoundedBox>
    {[
      [-0.5, 0.73, 0, colors.green],
      [0, 0.83, -0.08, colors.cyan],
      [0.5, 0.68, 0.05, colors.yellow],
    ].map(([x, y, z, color], index) => (
      <RoundedBox key={index} args={[0.42, 0.42, 0.42]} radius={0.025} smoothness={1} position={[x as number, y as number, z as number]} castShadow>
        <meshStandardMaterial color={color as string} roughness={0.74} />
      </RoundedBox>
    ))}
    {[0, 1, 2].map(index => (
      <mesh key={index} position={[-0.28 + index * 0.28, -0.15, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
        <meshStandardMaterial color={index === 2 ? colors.green : colors.aluminum} />
      </mesh>
    ))}
  </group>
)

const WhatTheKeyArtifact = () => {
  const keys = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!keys.current) return
    keys.current.children.forEach((key, index) => {
      key.position.y = Math.max(0, Math.sin(clock.elapsedTime * 2.2 - index * 0.55)) * 0.07
    })
  })

  return (
    <group>
      <ProductBase accent={colors.yellow} />
      <RoundedBox args={[2.2, 0.38, 1.35]} radius={0.05} smoothness={1} position={[0, -0.12, 0]} castShadow>
        <meshStandardMaterial color={colors.graphite} roughness={0.82} />
      </RoundedBox>
      <group ref={keys} position={[0, 0.11, 0.05]}>
        {Array.from({ length: 7 }, (_, index) => (
          <RoundedBox key={index} args={[0.27, 0.14, 1.04]} radius={0.012} smoothness={1} position={[(index - 3) * 0.29, 0, 0]} castShadow>
            <meshStandardMaterial color={colors.white} roughness={0.82} />
          </RoundedBox>
        ))}
      </group>
      {[0, 1, 3, 4, 5].map(index => (
        <RoundedBox key={index} args={[0.16, 0.2, 0.62]} radius={0.01} smoothness={1} position={[(index - 2.5) * 0.29, 0.28, -0.22]} castShadow>
          <meshStandardMaterial color={colors.dark} roughness={0.75} />
        </RoundedBox>
      ))}
      <mesh position={[0.88, 0.18, 0.53]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.03, 8]} />
        <meshStandardMaterial color={colors.yellow} roughness={0.62} />
      </mesh>
    </group>
  )
}

const CherryPickArtifact = () => (
  <group>
    <ProductBase accent={colors.red} />
    <RoundedBox args={[2.15, 1.65, 0.18]} radius={0.06} smoothness={1} position={[0, 0.18, -0.1]} castShadow>
      <meshStandardMaterial color={colors.white} roughness={0.82} />
    </RoundedBox>
    <group position={[0, 0.2, 0.03]}>
      <Line points={[[-0.72, -0.52, 0], [-0.3, -0.12, 0], [-0.3, 0.52, 0]]} color={colors.blue} lineWidth={5} />
      <Line points={[[-0.3, -0.12, 0], [0.28, 0.18, 0], [0.68, 0.55, 0]]} color={colors.green} lineWidth={5} />
      {[
        [-0.72, -0.52, colors.blue],
        [-0.3, -0.12, colors.blue],
        [-0.3, 0.52, colors.red],
        [0.28, 0.18, colors.green],
        [0.68, 0.55, colors.red],
      ].map(([x, y, color], index) => (
        <mesh key={index} position={[x as number, y as number, 0.05]}>
          <sphereGeometry args={[color === colors.red ? 0.15 : 0.105, 8, 5]} />
          <meshStandardMaterial color={color as string} roughness={0.7} />
        </mesh>
      ))}
    </group>
  </group>
)

const LidWatchArtifact = () => {
  const screen = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (screen.current) screen.current.rotation.x = -0.18 + Math.sin(clock.elapsedTime * 0.8) * 0.035
  })

  return (
    <group>
      <ProductBase accent={colors.cyan} />
      <group position={[0, -0.2, 0]}>
        <RoundedBox args={[2.05, 0.16, 1.3]} radius={0.04} smoothness={1} rotation={[-0.08, 0, 0]} castShadow>
          <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.02, 0.32]} radius={0.01} smoothness={1} position={[0, 0.1, 0.12]}>
          <meshStandardMaterial color={colors.dark} roughness={0.42} />
        </RoundedBox>
      </group>
      <group ref={screen} position={[0, -0.05, -0.55]} rotation={[-0.18, 0, 0]}>
        <RoundedBox args={[2, 1.35, 0.13]} radius={0.045} smoothness={1} position={[0, 0.67, 0]} castShadow>
          <meshStandardMaterial color={colors.aluminum} roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[1.75, 1.1, 0.035]} radius={0.025} smoothness={1} position={[0, 0.67, 0.08]}>
          <meshStandardMaterial color={colors.graphite} roughness={0.8} />
        </RoundedBox>
        <mesh position={[0.52, 0.72, 0.11]} rotation={[0, 0, Math.PI * 0.18]}>
          <torusGeometry args={[0.25, 0.055, 4, 12, Math.PI * 1.45]} />
          <meshStandardMaterial color={colors.cyan} roughness={0.62} />
        </mesh>
      </group>
      <mesh position={[0.82, -0.11, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.025, 8]} />
        <meshStandardMaterial color={colors.cyan} roughness={0.62} />
      </mesh>
    </group>
  )
}

const artifactMap = {
  OnlyScans: OnlyScansArtifact,
  Pitcher: PitcherArtifact,
  WiseMargin: WiseMarginArtifact,
  'MA Technix': MATechnixArtifact,
  'What The Key': WhatTheKeyArtifact,
  CherryPick: CherryPickArtifact,
  LidWatch: LidWatchArtifact,
}

type ArtifactSlotProps = {
  name: string
  index: number
  count: number
  activeIndex: number
  dragOffset: MutableRefObject<number>
  onSelect: (index: number) => void
}

export const ArtifactSlot = ({ name, index, count, activeIndex, dragOffset, onSelect }: ArtifactSlotProps) => {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const Artifact = artifactMap[name as keyof typeof artifactMap]

  useFrame((_, delta) => {
    if (!group.current) return
    let offset = index - activeIndex
    if (offset > count / 2) offset -= count
    if (offset < -count / 2) offset += count
    const angle = offset * 0.9 + dragOffset.current
    const focus = Math.max(0, 1 - Math.abs(angle) / 1.5)
    const targetScale = 0.46 + focus * 0.64 + (hovered ? 0.04 : 0)

    group.current.visible = Math.abs(angle) < 2.45
    group.current.position.x = MathUtils.damp(group.current.position.x, Math.sin(angle) * 3.55, 7, delta)
    group.current.position.z = MathUtils.damp(group.current.position.z, -Math.abs(Math.sin(angle)) * 0.9, 7, delta)
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -angle * 0.18, 7, delta)
    group.current.scale.setScalar(MathUtils.damp(group.current.scale.x, targetScale, 8, delta))
  })

  if (!Artifact) return null

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (event.delta > 6) return
    onSelect(index)
  }

  return (
    <group
      ref={group}
      onClick={select}
      onPointerOver={event => {
        event.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      <Float speed={1.15} rotationIntensity={0.035} floatIntensity={0.12} floatingRange={[-0.03, 0.06]}>
        <Artifact />
      </Float>
    </group>
  )
}
