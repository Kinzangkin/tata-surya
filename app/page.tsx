"use client"

import { useState } from "react"
import SolarSystemScene from "@/components/solar-system-scene"
import PlanetSelector from "@/components/planet-selector"
import PlanetInfo from "@/components/planet-info"

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState("earth")

  return (
    <main className="w-full h-screen flex flex-col md:flex-row bg-background">
      {/* 3D Scene */}
      <div className="flex-1 relative">
        <SolarSystemScene selectedPlanet={selectedPlanet} />
      </div>

      {/* Right Panel - Info dan Controls */}
      <div className="w-full md:w-96 bg-card border-l border-border flex flex-col overflow-hidden">
        {/* Planet Info */}
        <div className="flex-1 overflow-y-auto">
          <PlanetInfo selectedPlanet={selectedPlanet} />
        </div>

        {/* Planet Selector */}
        <div className="p-4 border-t border-border">
          <PlanetSelector selectedPlanet={selectedPlanet} onSelectPlanet={setSelectedPlanet} />
        </div>
      </div>
    </main>
  )
}
