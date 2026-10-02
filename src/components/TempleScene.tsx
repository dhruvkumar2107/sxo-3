import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type TempleSceneProps = {
  phase: 'intro' | 'reveal' | 'entered'
}

type LampProps = {
  position: [number, number, number]
  scale?: number
  intensity?: number
}

function Lamp({ position, scale = 1, intensity = 1 }: LampProps) {
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!flameRef.current) {
      return
    }

    flameRef.current.position.y = 0.76 + Math.sin(state.clock.elapsedTime * 8 + position[0]) * 0.05
  })

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.28, 0.12, 24]} />
        <meshStandardMaterial color="#8b5f29" metalness={1} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.8, 20]} />
        <meshStandardMaterial color="#b98a3e" metalness={1} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.2, 18, 18]} />
        <meshStandardMaterial color="#c8a25c" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.76, 0]} castShadow>
        <sphereGeometry args={[0.09, 18, 18]} />
        <meshStandardMaterial
          color="#ffd38a"
          emissive="#f7c763"
          emissiveIntensity={2.2 * intensity}
          metalness={0.08}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[0, 0.8, 0]} intensity={1.8 * intensity} distance={5} color="#f8c66a" />
    </group>
  )
}

function Bell() {
  const bellRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!bellRef.current) {
      return
    }

    const swing = Math.sin(state.clock.elapsedTime * 0.8 + 1.4) * 0.18
    bellRef.current.rotation.z = swing
  })

  return (
    <group ref={bellRef} position={[0, 2.25, 0.3]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.23, 0.28, 0.14, 32]} />
        <meshStandardMaterial color="#b08a45" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.18, 30, 26]} />
        <meshStandardMaterial color="#b38a48" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.34, 12]} />
        <meshStandardMaterial color="#7c5534" metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Pillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 1.8, 22]} />
        <meshStandardMaterial color="#c39c5d" metalness={1} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.26, 0.22, 0.18, 20]} />
        <meshStandardMaterial color="#b88a42" metalness={1} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#8d5c32" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  )
}

function TempleDoor({ side, phase }: { side: 'left' | 'right'; phase: 'intro' | 'reveal' | 'entered' }) {
  const doorRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!doorRef.current) {
      return
    }

    const openAmount = phase === 'intro' ? 0.1 : phase === 'reveal' ? 0.62 : 1
    const isLeft = side === 'left'
    doorRef.current.rotation.y = THREE.MathUtils.lerp(
      isLeft ? 0.15 : -0.15,
      isLeft ? -1.15 : 1.15,
      openAmount,
    )
  })

  return (
    <group ref={doorRef} position={[side === 'left' ? -1.8 : 1.8, 1.15, 4.05]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 2.6, 0.18]} />
        <meshStandardMaterial color="#5f3521" roughness={0.75} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, 0.08]}>
        <boxGeometry args={[1.18, 1.8, 0.06]} />
        <meshStandardMaterial color="#8a6031" metalness={1} roughness={0.24} />
      </mesh>
    </group>
  )
}

function Kuthuvilakku() {
  return (
    <group position={[0, 1.8, 1.2]}>
      <mesh castShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 2.2, 18]} />
        <meshStandardMaterial color="#b18145" metalness={1} roughness={0.26} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.3, 0.35, 14]} />
        <meshStandardMaterial color="#d2b066" metalness={1} roughness={0.2} />
      </mesh>
      {[[-0.55, 0.6, 0], [0.55, 0.6, 0], [0, 0.9, 0]].map((p, index) => (
        <group key={index} position={p as [number, number, number]}>
          <mesh castShadow>
            <sphereGeometry args={[0.12, 18, 18]} />
            <meshStandardMaterial color="#d0aa5e" metalness={1} roughness={0.18} />
          </mesh>
          <pointLight position={[0, 0.2, 0]} intensity={2.2} distance={5.5} color="#f9d48d" />
        </group>
      ))}
    </group>
  )
}

function Garlands() {
  const garlandRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!garlandRef.current) {
      return
    }

    garlandRef.current.position.y = 2.4 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08
  })

  return (
    <group ref={garlandRef} position={[0, 2.5, 0.6]}>
      {Array.from({ length: 16 }).map((_, index) => (
        <mesh key={index} position={[(index - 7.5) * 0.32, Math.sin(index * 0.9) * 0.08, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#f7f2eb" emissive="#fdf7ee" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function SilkCurtain({ phase }: { phase: 'intro' | 'reveal' | 'entered' }) {
  const curtainRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!curtainRef.current) {
      return
    }

    const time = state.clock.elapsedTime
    const revealPhase = phase === 'reveal' ? THREE.MathUtils.clamp((time - 4.5) / 4, 0, 1) : phase === 'entered' ? 1 : 0
    curtainRef.current.position.z = THREE.MathUtils.lerp(8, -1.5, revealPhase)
    curtainRef.current.position.y = 1.8 + Math.sin(time * 2.5) * 0.08
    curtainRef.current.rotation.y = THREE.MathUtils.lerp(0.3, -0.2, revealPhase)
    curtainRef.current.scale.setScalar(THREE.MathUtils.lerp(1.1, 2.2, revealPhase))
  })

  return (
    <mesh ref={curtainRef} position={[0, 1.9, 8]} rotation={[0.15, 0.3, 0.04]}>
      <planeGeometry args={[6, 5, 1, 1]} />
      <meshPhysicalMaterial
        color="#4d1d27"
        transparent
        opacity={0.85}
        roughness={0.8}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function JasmineCloud({ phase }: { phase: 'intro' | 'reveal' | 'entered' }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => {
        const angle = (index / 90) * Math.PI * 2
        const radius = 1.8 + (index % 16) * 0.18
        const x = Math.cos(angle) * radius
        const y = 0.5 + (index % 9) * 0.18
        const z = Math.sin(angle) * radius
        return { x, y, z, scale: 0.06 + (index % 5) * 0.02 }
      }),
    [],
  )

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const active = phase === 'reveal' || phase === 'entered' ? 1 : 0
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    groupRef.current.position.y = 0.8 + active * 0.5 + Math.sin(state.clock.elapsedTime * 2.1) * 0.1
    groupRef.current.visible = active > 0.05
  })

  return (
    <group ref={groupRef}>
      {petals.map((petal, index) => (
        <mesh key={index} position={[petal.x, petal.y, petal.z]} rotation={[0.7, 0.4, 0.3]}>
          <sphereGeometry args={[petal.scale, 10, 10]} />
          <meshStandardMaterial color="#f8f0ef" emissive="#f3edf0" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function FallingPetals({ active }: { active: boolean }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        x: Math.sin(index * 1.37) * 3.1,
        y: 2 + (index % 7) * 0.65 + (index / 40) * 5,
        z: Math.cos(index * 1.19) * 3.2,
        s: 0.11 + ((index * 7) % 9) * 0.015,
        drift: Math.sin(index * 2.13) * 1.4,
        speed: 0.8 + (index % 6) * 0.12,
        spin: 0.8 + (index % 9) * 0.18,
        rotate: ((index % 10) + 1) * 0.7,
        color: ['#f7d6d6', '#f9e8b7', '#f3b7c1', '#f6d3a5'][index % 4],
      })),
    [],
  )

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.visible = active

    petals.forEach((petal, index) => {
      const mesh = groupRef.current?.children[index] as THREE.Mesh | undefined
      if (!mesh) {
        return
      }

      const t = state.clock.elapsedTime
      const fall = ((t * petal.speed + index * 0.33) % 10) - 5
      const x = petal.x + Math.sin(t * 1.4 + index) * 0.7 + petal.drift * (fall + 4)
      const y = petal.y - fall
      const z = petal.z + Math.sin(t * 1.2 + index) * 0.5

      mesh.position.set(x, y, z)
      mesh.rotation.x = t * petal.spin + petal.rotate
      mesh.rotation.y = t * petal.spin * 0.7 + petal.rotate
      mesh.rotation.z = t * 0.9 + petal.rotate
      mesh.scale.setScalar(active ? 1 : 0)
    })
  })

  return (
    <group ref={groupRef} visible={active}>
      {petals.map((petal, index) => (
        <mesh key={index} position={[petal.x, petal.y, petal.z]} rotation={[0, 0, petal.rotate]}>
          <planeGeometry args={[petal.s * 2.2, petal.s * 3.2]} />
          <meshStandardMaterial
            color={petal.color}
            emissive={petal.color}
            emissiveIntensity={0.24}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function TempleEnvironment({ phase }: TempleSceneProps) {
  const groundRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groundRef.current) {
      groundRef.current.rotation.x = -Math.PI / 2
      groundRef.current.position.y = -1.4
    }

    if (glowRef.current) {
      const intensity = phase === 'intro' ? 0.7 : phase === 'reveal' ? 2.2 : 2.8
      glowRef.current.intensity = intensity + Math.sin(time * 2.4) * 0.35
    }
  })

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const swayX = state.pointer.x * 0.22
    const swayY = state.pointer.y * 0.12
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, swayX, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, swayY, 0.05)
  })

  return (
    <group ref={groupRef} position={[0, -0.1, -3]}>
      <mesh ref={groundRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1b120e" roughness={0.94} metalness={0.12} />
      </mesh>

      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[6.5, 7.2, 0.8, 64]} />
        <meshStandardMaterial color="#2d1d17" roughness={0.9} metalness={0.18} />
      </mesh>

      {[-4, -2.3, 0, 2.3, 4].map((x) => (
        <Pillar key={x} position={[x, 0.2, 0.8]} />
      ))}

      <Kuthuvilakku />
      <Garlands />
      <TempleDoor side="left" phase={phase} />
      <TempleDoor side="right" phase={phase} />
      <Lamp position={[-2.9, 0.3, 1.1]} scale={1.1} intensity={phase === 'intro' ? 0.3 : 1} />
      <Lamp position={[2.9, 0.3, 1.1]} scale={1.1} intensity={phase === 'intro' ? 0.3 : 1} />
      <Lamp position={[-1.9, 0.4, 3.1]} scale={0.8} intensity={phase === 'intro' ? 0.2 : 1} />
      <Lamp position={[1.9, 0.4, 3.1]} scale={0.8} intensity={phase === 'intro' ? 0.2 : 1} />
      <Bell />
      <JasmineCloud phase={phase} />
      <FallingPetals active={phase === 'entered'} />
      <SilkCurtain phase={phase} />
      <group position={[0, 0.7, 3.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.7, 0.08, 1.6]} />
          <meshStandardMaterial color="#966c36" metalness={1} roughness={0.25} />
        </mesh>
      </group>
      <pointLight ref={glowRef} position={[0, 2.6, 4]} intensity={1.5} distance={18} color="#f8d28f" />
    </group>
  )
}

function CameraRig({ phase }: { phase: TempleSceneProps['phase'] }) {
  useFrame((state) => {
    const camera = state.camera
    const time = state.clock.elapsedTime

    const pointerX = state.pointer.x * 0.35

    if (phase === 'intro') {
      const progress = Math.min(1, time / 9)
      camera.position.x = Math.sin(time * 0.5) * 0.45 + pointerX
      camera.position.y = 1.5 + Math.sin(time * 0.8) * 0.08 + state.pointer.y * 0.14
      camera.position.z = 8.8 - progress * 5.5
      camera.lookAt(0, 1.5, 0)
      return
    }

    if (phase === 'reveal') {
      const revealProgress = Math.min(1, (time - 1.2) / 7)
      camera.position.x = THREE.MathUtils.lerp(0.2 + pointerX, 0.2 + pointerX * 0.7, revealProgress)
      camera.position.y = THREE.MathUtils.lerp(1.5 + state.pointer.y * 0.18, 1.8, revealProgress)
      camera.position.z = THREE.MathUtils.lerp(3.8, 1.2, revealProgress)
      camera.lookAt(0, 1.6, 1.5)
      return
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.2 + pointerX * 0.4, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.9 + state.pointer.y * 0.22, 0.03)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, -0.4, 0.03)
    camera.lookAt(0, 1.5, 2.4)
  })

  return null
}

function TempleScene({ phase }: TempleSceneProps) {
  return (
    <div className="temple-scene" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{ position: [0, 1.5, 8.8], fov: 34 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#130d0d']} />
        <fog attach="fog" args={['#130d0d', 8, 18]} />
        <ambientLight intensity={phase === 'intro' ? 0.15 : 0.35} color="#f7d7ad" />
        <hemisphereLight args={['#f8d799', '#1a0d09', 0.6]} />
        <directionalLight
          castShadow
          position={[4, 6, 5]}
          intensity={phase === 'intro' ? 0.8 : 1.7}
          color="#f7e4b4"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[0, 6, 2]} intensity={phase === 'intro' ? 0.25 : 2.8} angle={0.44} penumbra={0.75} color="#f9d898" />
        <Sparkles count={phase === 'intro' ? 120 : 220} scale={[12, 8, 12]} size={2.8} color="#f4d59b" speed={0.5} />
        <CameraRig phase={phase} />
        <TempleEnvironment phase={phase} />
      </Canvas>
    </div>
  )
}

export default TempleScene
