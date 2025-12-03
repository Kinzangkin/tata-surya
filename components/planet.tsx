"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

interface PlanetProps {
  name: string
  size: number
  distance: number
  speed: number
  color: string
  selected: boolean
  onClicked?: (name: string) => void
}

export default function Planet({ name, size, distance, speed, color, selected, onClicked }: PlanetProps) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<any>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.001

      if (selected) {
        meshRef.current.scale.x += (1.15 - meshRef.current.scale.x) * 0.1
        meshRef.current.scale.y += (1.15 - meshRef.current.scale.y) * 0.1
        meshRef.current.scale.z += (1.15 - meshRef.current.scale.z) * 0.1
      } else {
        meshRef.current.scale.x += (1 - meshRef.current.scale.x) * 0.1
        meshRef.current.scale.y += (1 - meshRef.current.scale.y) * 0.1
        meshRef.current.scale.z += (1 - meshRef.current.scale.z) * 0.1
      }
    }
  })

  const handleClick = () => {
    onClicked?.(name)
  }

  const getPlanetGeometry = () => {
    switch (name) {
      case "saturn":
        // Saturn dengan ring
        return (
          <>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.2}
              roughness={0.6}
              emissive={color}
              emissiveIntensity={0.1}
            />
            {/* Saturn rings */}
            <mesh rotation={[Math.PI * 0.35, 0, 0]} position={[0, 0, 0]}>
              <torusGeometry args={[size * 2.2, size * 0.6, 2, 100]} />
              <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} transparent opacity={0.8} />
            </mesh>
          </>
        )
      case "earth":
        return (
          <>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.1}
              roughness={0.7}
              emissive="#1a4d7a"
              emissiveIntensity={0.2}
            />
          </>
        )
      case "jupiter":
        return (
          <>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.15}
              roughness={0.5}
              emissive="#8b6f47"
              emissiveIntensity={0.1}
            />
          </>
        )
      case "mars":
        return (
          <>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.1}
              roughness={0.8}
              emissive="#6b3e2e"
              emissiveIntensity={0.05}
            />
          </>
        )
      default:
        return (
          <>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.2}
              roughness={0.6}
              emissive={color}
              emissiveIntensity={0.05}
            />
          </>
        )
    }
  }

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[distance, 0, 0]} onClick={handleClick}>
        {getPlanetGeometry()}
      </mesh>
    </group>
  )
}
