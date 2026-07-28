'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const PETAL_COUNT = 60

type PetalState = {
  x: number
  y: number
  z: number
  speed: number
  sway: number
  swaySpeed: number
  rot: number
  rotSpeedX: number
  rotSpeedY: number
  rotSpeedZ: number
  scale: number
  meshIndex: number // 0: Pink, 1: Rose, 2: White
  instanceIndex: number
}

function Petals() {
  const meshPink = useRef<THREE.InstancedMesh>(null)
  const meshRose = useRef<THREE.InstancedMesh>(null)
  const meshWhite = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Curved organic petal geometry centered
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.2, 0.1, 0.3, 0.35, 0.15, 0.65)
    shape.bezierCurveTo(0, 0.85, -0.15, 0.65, -0.3, 0.35)
    shape.quadraticCurveTo(-0.2, 0.1, 0, 0)
    
    const geo = new THREE.ShapeGeometry(shape, 16)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      // Curl the petal in 3D space
      const z = -0.35 * (x * x + (y - 0.35) * (y - 0.35))
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()
    geo.center() // Center of mass for neat rotation
    return geo
  }, [])

  // Distribute instances across 3 groups
  const petalsData = useMemo(() => {
    const counts = [0, 0, 0]
    return Array.from({ length: PETAL_COUNT }, (_, i) => {
      const meshIndex = i % 3
      const instanceIndex = counts[meshIndex]
      counts[meshIndex]++
      
      return {
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 14 - 3,
        z: (Math.random() - 0.5) * 8 - 2,
        speed: 0.2 + Math.random() * 0.35,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.2 + Math.random() * 0.4,
        rot: Math.random() * Math.PI * 2,
        rotSpeedX: 0.15 + Math.random() * 0.35,
        rotSpeedY: 0.1 + Math.random() * 0.3,
        rotSpeedZ: 0.2 + Math.random() * 0.4,
        scale: 0.2 + Math.random() * 0.35,
        meshIndex,
        instanceIndex,
      } as PetalState
    })
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const meshes = [meshPink.current, meshRose.current, meshWhite.current]

    petalsData.forEach((p) => {
      // Fall down
      p.y -= p.speed * delta
      
      // If below screen, reset to top
      if (p.y < -7) {
        p.y = 8
        p.x = (Math.random() - 0.5) * 16
        p.speed = 0.2 + Math.random() * 0.35
      }

      // Add gentle horizontal wind drift and sway
      const swayX = Math.sin(t * p.swaySpeed + p.sway) * 0.5
      const driftX = Math.sin(t * 0.08) * 0.4 // subtle uniform wind drift

      dummy.position.set(p.x + swayX + driftX, p.y, p.z)
      
      // Rotate on all 3 axes
      dummy.rotation.set(
        t * p.rotSpeedX + p.rot,
        t * p.rotSpeedY + p.rot * 0.5,
        t * p.rotSpeedZ + p.rot * 0.3
      )
      
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()

      const targetMesh = meshes[p.meshIndex]
      if (targetMesh) {
        targetMesh.setMatrixAt(p.instanceIndex, dummy.matrix)
      }
    })

    meshes.forEach((m) => {
      if (m) {
        m.instanceMatrix.needsUpdate = true
      }
    })
  })

  // Pink count: 20, Rose count: 20, White count: 20
  const counts = [20, 20, 20]

  return (
    <>
      {/* 1. Pastel Pink Petals */}
      <instancedMesh ref={meshPink} args={[geometry, undefined, counts[0]]}>
        <meshPhysicalMaterial 
          color="#ffd6dc" // soft blush pink
          transmission={0.65} 
          thickness={0.4} 
          roughness={0.25} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.9} 
          clearcoat={0.1}
        />
      </instancedMesh>

      {/* 2. Warm Rose Petals */}
      <instancedMesh ref={meshRose} args={[geometry, undefined, counts[1]]}>
        <meshPhysicalMaterial 
          color="#fbc5ca" // deeper warm rose pink
          transmission={0.6} 
          thickness={0.5} 
          roughness={0.3} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.85} 
          clearcoat={0.1}
        />
      </instancedMesh>

      {/* 3. Pure White/Ivory Petals */}
      <instancedMesh ref={meshWhite} args={[geometry, undefined, counts[2]]}>
        <meshPhysicalMaterial 
          color="#fffff8" // ivory white
          transmission={0.7} 
          thickness={0.3} 
          roughness={0.2} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.88} 
          clearcoat={0.05}
        />
      </instancedMesh>
    </>
  )
}

export function PetalsCanvas({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Petals />
      </Canvas>
    </div>
  )
}
