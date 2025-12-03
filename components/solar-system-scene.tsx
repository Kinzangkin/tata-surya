"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import PlanetGLB from "./planet-glb"
import Sun from "./sun"
import { useEffect } from "react"

interface SolarSystemSceneProps {
  selectedPlanet: string
}

function CameraController({
  selectedPlanet,
  planetData,
}: {
  selectedPlanet: string
  planetData: Record<string, { distance: number; zoom: number }>
}) {
  const { camera } = useThree()

  useEffect(() => {
    const info = planetData[selectedPlanet]
    if (!info) return

    const start = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const end = {
      x: info.distance + info.zoom,
      y: info.zoom * 0.8,
      z: info.distance + info.zoom,
    }

    let p = 0
    const duration = 900
    const startTime = Date.now()

    const animate = () => {
      p = Math.min((Date.now() - startTime) / duration, 1)

      // cubic ease-out
      const t = 1 - Math.pow(1 - p, 3)

      camera.position.set(
        start.x + (end.x - start.x) * t,
        start.y + (end.y - start.y) * t,
        start.z + (end.z - start.z) * t
      )

      if (p < 1) requestAnimationFrame(animate)
    }

    animate()
  }, [selectedPlanet, camera, planetData])

  return null
}

function Stars() {
  const stars = new Float32Array(1500 * 3)
  for (let i = 0; i < stars.length; i += 3) {
    stars[i] = (Math.random() - 0.5) * 3000
    stars[i + 1] = (Math.random() - 0.5) * 3000
    stars[i + 2] = (Math.random() - 0.5) * 3000
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[stars, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.2} color="#ffffff" />
    </points>
  )
}

function OrbitalLines({ distances }: { distances: number[] }) {
  return (
    <>
      {distances.map((d) => {
        const pts = new Float32Array(256 * 3)
        for (let i = 0; i < 256; i++) {
          const ang = (i / 256) * Math.PI * 2
          pts[i * 3] = Math.cos(ang) * d
          pts[i * 3 + 1] = 0
          pts[i * 3 + 2] = Math.sin(ang) * d
        }

        return (
          <line key={d}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pts, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </line>
        )
      })}
    </>
  )
}

export default function SolarSystemScene({ selectedPlanet }: SolarSystemSceneProps) {
  // 🔥 Konsisten, cinematic, dan mudah diatur
  const planets = {
    mercury: { dist: 18, speed: 0.04, scale: 0.04, zoom: 15, url: "/images/merkurius/source/Merkurius.glb" },
    venus: { dist: 28, speed: 0.015, scale: 0.10, zoom: 22, url: "/images/venus.glb" },
    earth: { dist: 40, speed: 0.01, scale: 0.11, zoom: 25, url: "/images/earth/source/Untitled.glb" },
    mars: { dist: 55, speed: 0.008, scale: 0.07, zoom: 26, url: "/images/mars/source/Mars.glb" },
    jupiter: { dist: 85, speed: 0.002, scale: 1.2, zoom: 45, url: "/images/jupiter.glb" },
    saturn: { dist: 125, speed: 0.0009, scale: 1.0, zoom: 50, url: "/images/saturn.glb" },
    uranus: { dist: 165, speed: 0.0004, scale: 0.55, zoom: 55, url: "/images/uranus.glb" },
    neptune: { dist: 210, speed: 0.0001, scale: 0.50, zoom: 60, url: "/images/neptune.glb" },
  }

  const planetData = Object.fromEntries(
    Object.entries(planets).map(([k, v]) => [
      k,
      { distance: v.dist, zoom: v.zoom },
    ])
  )

  return (
    <Canvas camera={{ position: [0, 90, 180], fov: 50 }}>
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffeb3b" />

      <Stars />
      <Sun />

      {/* Render semua planet otomatis */}
      {Object.entries(planets).map(([name, p]) => (
        <PlanetGLB
          key={name}
          name={name}
          distance={p.dist}
          speed={p.speed}
          selected={selectedPlanet === name}
          modelUrl={p.url}
          scale={p.scale}
        />
      ))}

      <OrbitalLines distances={Object.values(planets).map((p) => p.dist)} />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.35}
        enableZoom
        enablePan
        maxDistance={600}
        minDistance={10}
      />

      <CameraController selectedPlanet={selectedPlanet} planetData={planetData} />
    </Canvas>
  )
}
