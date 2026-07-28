'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows, PresentationControls, useTexture } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function Logo3DSeal() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Load the actual brand logo image as a 3D texture
  const logoTexture = useTexture('/images/flora-brand-logo.png')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    // Gentle floating and spinning
    groupRef.current.rotation.y = Math.sin(t / 4) * 0.12
    groupRef.current.rotation.x = Math.cos(t / 4) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* 3D Circular Ceramic Seal Disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.4, 0.2, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.12} 
          metalness={0.05} 
        />
      </mesh>

      {/* Front Face Cover mapped with the brand logo texture */}
      <mesh position={[0, 0, 0.105]}>
        <circleGeometry args={[2.36, 64]} />
        <meshStandardMaterial 
          map={logoTexture} 
          roughness={0.2}
          metalness={0.02}
        />
      </mesh>

      {/* Rose Gold outer rim decoration */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.42, 0.04, 16, 100]} />
        <meshStandardMaterial 
          color="#e5989b" // Rose gold frame
          metalness={0.9} 
          roughness={0.15} 
          envMapIntensity={2.0} 
        />
      </mesh>
    </group>
  )
}

export function FloatingRings({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow />
        <pointLight position={[-5, -5, -2]} intensity={0.4} />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.4, 0.4]}
          azimuth={[-0.8, 0.8]}
          snap
          damping={0.25}
        >
          <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
            <Suspense fallback={null}>
              <Logo3DSeal />
            </Suspense>
          </Float>
        </PresentationControls>
        
        <Environment preset="apartment" />
        
        <ContactShadows 
          position={[0, -2.1, 0]} 
          opacity={0.3} 
          scale={8} 
          blur={2.0} 
          far={3.5} 
        />
      </Canvas>
    </div>
  )
}
