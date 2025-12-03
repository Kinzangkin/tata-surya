"use client"

import { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Sun() {
  const sunRef = useRef(null)

  const gltf = useGLTF("/images/sun.glb")

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <primitive object={gltf.scene} scale={0.8} dispose={null} />

      {/* Point light for illumination */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#FDB813" distance={200} />
    </group>
  )
}
