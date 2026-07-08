import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function NeuralNode({ position, color = '#0367FC', size = 0.15, speed = 1 }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * speed
      mesh.current.rotation.y += 0.015 * speed
    }
  })
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  )
}

function DataOrbit({ position, color = '#0367FC', radius = 0.8, speed = 0.5 }) {
  const ring = useRef()
  const dots = useRef()
  const dotPositions = useMemo(() => {
    const pts = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0])
    }
    return pts
  }, [radius])

  useFrame((state) => {
    if (ring.current) ring.current.rotation.z += 0.005 * speed
    if (dots.current) dots.current.rotation.z += 0.005 * speed
  })

  return (
    <group position={position}>
      <mesh ref={ring} rotation={[0.3, 0, 0]}>
        <ringGeometry args={[radius - 0.03, radius + 0.03, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.05} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <group ref={dots} rotation={[0.3, 0, 0]}>
        {dotPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Shield({ position, color = '#D2F801', speed = 0.3 }) {
  const mesh = useRef()
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.008 * speed
  })
  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={mesh} position={position}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  )
}

function CyberRing({ position, color = '#D2F801', speed = 0.4 }) {
  const mesh1 = useRef()
  const mesh2 = useRef()
  useFrame(() => {
    if (mesh1.current) { mesh1.current.rotation.x += 0.006 * speed; mesh1.current.rotation.y += 0.004 * speed }
    if (mesh2.current) { mesh2.current.rotation.x -= 0.004 * speed; mesh2.current.rotation.z += 0.006 * speed }
  })
  return (
    <group position={position}>
      <mesh ref={mesh1}>
        <torusGeometry args={[0.6, 0.02, 16, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
      <mesh ref={mesh2} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.5, 0.015, 16, 48]} />
        <meshStandardMaterial color="#0367FC" emissive="#0367FC" emissiveIntensity={0.08} transparent opacity={0.25} />
      </mesh>
    </group>
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
      <pointsMaterial size={0.025} color="#0367FC" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function AICore({ position, color = '#0367FC' }) {
  const mesh = useRef()
  const glowMesh = useRef()
  useFrame((state) => {
    if (mesh.current) { mesh.current.rotation.y += 0.008; mesh.current.rotation.x += 0.005 }
    if (glowMesh.current) { glowMesh.current.rotation.y -= 0.003; glowMesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05) }
  })
  return (
    <group position={position}>
      <mesh ref={mesh}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={glowMesh}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.05} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function FullScene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10,10,10]} intensity={0.5} color="#0367FC" />
      <pointLight position={[-10,-10,-10]} intensity={0.3} color="#D2F801" />
      <AICore position={[0,0,0]} />
      <DataOrbit position={[0,0,0]} radius={0.9} color="#0367FC" speed={0.8} />
      <DataOrbit position={[0,0,0]} radius={1.3} color="#D2F801" speed={0.4} />
      <NeuralNode position={[-3,1.2,-3]} size={0.2} color="#0367FC" speed={1.5} />
      <NeuralNode position={[3.2,-0.5,-4]} size={0.18} color="#D2F801" speed={0.7} />
      <NeuralNode position={[-2,-1.5,-5]} size={0.15} color="#0367FC" speed={1.2} />
      <NeuralNode position={[2.5,1.8,-6]} size={0.16} color="#D2F801" speed={0.9} />
      <Shield position={[-1.5,2,-2]} color="#D2F801" speed={1.2} />
      <Shield position={[1.8,-1.8,-3.5]} color="#0367FC" speed={0.5} />
      <CyberRing position={[0.5,-1,2]} color="#D2F801" />
      <CyberRing position={[-0.8,1.5,1.5]} color="#0367FC" speed={0.6} />
      <Particles count={300} />
    </>
  )
}

function SimpleScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5,5,5]} intensity={0.3} color="#0367FC" />
      <AICore position={[0,0,0]} />
      <DataOrbit position={[0,0,0]} radius={0.7} color="#0367FC" speed={0.6} />
      <NeuralNode position={[-2.5,0.8,-3]} size={0.15} color="#D2F801" speed={1.2} />
      <NeuralNode position={[2.5,-0.6,-3]} size={0.17} color="#0367FC" speed={0.8} />
      <Shield position={[0,1.5,-2]} color="#D2F801" speed={0.5} />
      <Particles count={150} />
    </>
  )
}

function MinimalScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <AICore position={[0,0,0]} />
      <DataOrbit position={[0,0,0]} radius={0.6} color="#0367FC" speed={0.5} />
      <CyberRing position={[0,0,0]} />
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
