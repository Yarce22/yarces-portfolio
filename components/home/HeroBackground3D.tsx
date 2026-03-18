'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef<THREE.Points>(null)

  const { positions, count } = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return { positions, count }
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.04
    mesh.current.rotation.x = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#859f3d"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

function WireframeIco() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.12
    mesh.current.rotation.x = clock.getElapsedTime() * 0.07
  })

  return (
    <mesh ref={mesh} position={[4, 0, -2]}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#859f3d" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <Particles />
        <WireframeIco />
      </Canvas>
    </div>
  )
}
