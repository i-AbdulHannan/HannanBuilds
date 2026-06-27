import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Gear({ position, radius = 0.8, tubeRadius = 0.25, segments = 8, color = '#0326FC', speed = 1, mouse }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005 * speed
      mesh.current.rotation.z += 0.008 * speed
      if (mouse?.current) {
        const tx = (mouse.current.x * Math.PI) / 10
        const ty = (mouse.current.y * Math.PI) / 10
        mesh.current.rotation.x += (tx - mesh.current.rotation.x) * 0.01
        mesh.current.rotation.z += (ty - mesh.current.rotation.z) * 0.01
      }
    }
  })
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[radius, tubeRadius, segments, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

function Particles({ count = 200 }) {
  const mesh = useRef()
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random() - 0.5) * 16
      pos[i*3+1] = (Math.random() - 0.5) * 16
      pos[i*3+2] = (Math.random() - 0.5) * 16
    }
    return [pos]
  }, [count])
  useFrame(() => { if (mesh.current) mesh.current.rotation.y += 0.0003 })
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#0326FC" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Sphere({ position, mouse }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.003
      mesh.current.rotation.x += 0.002
    }
  })
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#0326FC" emissiveIntensity={0.04} wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  )
}

function Ring({ position, mouse }) {
  const mesh = useRef()
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x += 0.004
  })
  return (
    <mesh ref={mesh} position={position} rotation={[0.5, 0, 0]}>
      <ringGeometry args={[0.5, 0.7, 32]} />
      <meshStandardMaterial color="#0326FC" emissive="#0326FC" emissiveIntensity={0.05} wireframe transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  )
}

function FullScene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10,10,10]} intensity={0.5} color="#0326FC" />
      <pointLight position={[-10,-10,-10]} intensity={0.2} color="#fff" />
      <Gear position={[0,0,0]} radius={1} tubeRadius={0.25} segments={8} mouse={mouse} />
      <Gear position={[-3,1.2,-3]} radius={0.5} tubeRadius={0.15} segments={6} color="#fff" speed={1.5} mouse={mouse} />
      <Gear position={[3.2,-0.5,-4]} radius={0.6} tubeRadius={0.18} segments={10} speed={0.7} mouse={mouse} />
      <Gear position={[-2,-1.5,-5]} radius={0.4} tubeRadius={0.12} segments={6} color="#fff" speed={1.2} mouse={mouse} />
      <Gear position={[2.5,1.8,-6]} radius={0.45} tubeRadius={0.14} segments={8} speed={0.9} mouse={mouse} />
      <Sphere position={[-1.5,2,-2]} mouse={mouse} />
      <Sphere position={[1.8,-1.8,-3.5]} mouse={mouse} />
      <Particles count={300} />
    </>
  )
}

function SimpleScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5,5,5]} intensity={0.3} color="#0326FC" />
      <Gear position={[0,0,0]} radius={0.8} tubeRadius={0.2} segments={8} speed={0.6} />
      <Gear position={[-2.5,0.8,-3]} radius={0.35} tubeRadius={0.1} segments={6} color="#fff" speed={1.2} />
      <Gear position={[2.5,-0.6,-3]} radius={0.4} tubeRadius={0.12} segments={10} speed={0.8} />
      <Particles count={150} />
    </>
  )
}

function MinimalScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Gear position={[0,0,0]} radius={0.6} tubeRadius={0.15} segments={8} speed={0.5} />
      <Ring position={[0,0,0]} />
      <Particles count={80} />
    </>
  )
}

export default function EngineeringScene({ variant = 'full', mouse }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const config = {
    full: { Scene: FullScene, pos: [0,0,isMobile?6:5], fov: isMobile?70:55 },
    simple: { Scene: SimpleScene, pos: [0,0,isMobile?5:4], fov: isMobile?65:50 },
    minimal: { Scene: MinimalScene, pos: [0,0,isMobile?4:3.5], fov: isMobile?60:45 },
  }

  const { Scene: SceneComponent, pos, fov } = config[variant] || config.minimal

  return (
    <div className="absolute inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={pos} fov={fov} />
        {variant === 'full' ? <FullScene mouse={mouse} /> :
         variant === 'simple' ? <SimpleScene /> : <MinimalScene />}
      </Canvas>
    </div>
  )
}
