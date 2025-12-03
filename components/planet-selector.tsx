"use client"

interface PlanetSelectorProps {
  selectedPlanet: string
  onSelectPlanet: (planet: string) => void
}

const PLANETS = [
  { id: "mercury", name: "Merkurius", emoji: "☿️" },
  { id: "venus", name: "Venus", emoji: "♀️" },
  { id: "earth", name: "Bumi", emoji: "🌍" },
  { id: "mars", name: "Mars", emoji: "♂️" },
  { id: "jupiter", name: "Jupiter", emoji: "♃️" },
  { id: "saturn", name: "Saturnus", emoji: "♄️" },
  { id: "uranus", name: "Uranus", emoji: "♅️" },
  { id: "neptune", name: "Neptunus", emoji: "♆️" },
]

export default function PlanetSelector({ selectedPlanet, onSelectPlanet }: PlanetSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Pilih Planet</h3>
      <div className="grid grid-cols-2 gap-2">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => onSelectPlanet(planet.id)}
            className={`p-3 rounded-lg transition-all duration-300 text-sm font-medium ${
              selectedPlanet === planet.id
                ? "bg-primary text-primary-foreground ring-2 ring-accent"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            <div className="text-lg mb-1">{planet.emoji}</div>
            <div className="text-xs">{planet.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
