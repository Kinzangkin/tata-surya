"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Box3, Vector3 } from "three"
import type { Group } from "three"

interface PlanetGLBProps {
  name: string
  distance: number
  speed: number
  selected: boolean
  onClicked?: (name: string) => void
  modelUrl: string
  scale: number
}

const GLOBAL_SCALE = 9.5

export default function PlanetGLB({
  name,
  distance,
  speed,
  selected,
  onClicked,
  modelUrl,
  scale,
}: PlanetGLBProps) {
  const meshRef = useRef<Group>(null)
  const [normalizedScale, setNormalizedScale] = useState(1)

  const gltf = useGLTF(modelUrl)

  // Debug cek material
  useEffect(() => {
    console.log(`🔍 DEBUG: Planet = ${name}`)
    console.log("Materials:", gltf.materials)
  }, [gltf, name])

  // Hitung scale normalisasi berdasarkan ukuran objek
  useEffect(() => {
    if (!gltf.scene) return

    const box = new Box3().setFromObject(gltf.scene)
    const size = new Vector3()
    box.getSize(size)

    const maxDimension = Math.max(size.x, size.y, size.z)
    const normScale = maxDimension > 0 ? 1 / maxDimension : 1

    setNormalizedScale(normScale)

    if (meshRef.current) {
      const initialScale = normScale * scale * GLOBAL_SCALE
      meshRef.current.scale.set(initialScale, initialScale, initialScale)
    }
  }, [gltf.scene, scale])

  // Smooth scale animation saat planet dipilih
  useFrame(() => {
    if (!meshRef.current) return

    const targetScale =
      normalizedScale * scale * GLOBAL_SCALE * (selected ? 1.15 : 1)

    const current = meshRef.current.scale.x
    const next = current + (targetScale - current) * 0.12

    meshRef.current.scale.setScalar(next)
  })

  const handleClick = () => onClicked?.(name)

  if (!gltf.scene) return null

  return (
    <group
      ref={meshRef}
      position={[distance, 0, 0]}
      onClick={handleClick}
    >
      <primitive object={gltf.scene.clone()} dispose={null} />
    </group>
  )
}
