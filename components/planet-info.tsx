"use client"

interface PlanetInfoProps {
  selectedPlanet: string
}

const PLANET_DATA: Record<
  string,
  {
    name: string
    diameter: string
    distance: string
    description: string
    characteristics: string[]
  }
> = {
  mercury: {
    name: "Merkurius",
    diameter: "4,879 km",
    distance: "57.9 juta km dari Matahari",
    description:
      "Planet terdekat dengan Matahari. Permukaan Merkurius sangat panas di siang hari dan sangat dingin di malam hari.",
    characteristics: [
      "Terkecil di Tata Surya",
      "Tanpa atmosfer",
      "Bergerak tercepat mengelilingi Matahari",
      "Suhu: -173°C hingga 427°C",
    ],
  },
  venus: {
    name: "Venus",
    diameter: "12,104 km",
    distance: "108.2 juta km dari Matahari",
    description:
      "Planet tercerah di langit malam kami. Venus memiliki atmosfer paling tebal dengan tekanan permukaan sangat tinggi.",
    characteristics: [
      "Planet paling panas di Tata Surya",
      "Berputar berlawanan arah jarum jam",
      "Tidak memiliki satelit",
      "Suhu permukaan: 462°C",
    ],
  },
  earth: {
    name: "Bumi",
    diameter: "12,742 km",
    distance: "149.6 juta km dari Matahari",
    description:
      "Planet ketiga dari Matahari dan satu-satunya planet yang diketahui memiliki kehidupan. Air menutupi 71% permukaannya.",
    characteristics: [
      "Satu-satunya planet dengan kehidupan",
      "1 satelit (Bulan)",
      "Atmosfer mengandung oksigen",
      "Suhu rata-rata: 15°C",
    ],
  },
  mars: {
    name: "Mars",
    diameter: "6,779 km",
    distance: "227.9 juta km dari Matahari",
    description:
      "Planet merah yang ditandai dengan warna kemerahan karena oksida besi. Mars memiliki gunung tertinggi di Tata Surya.",
    characteristics: [
      "Berbentuk gunung tertinggi (Olympus Mons)",
      "2 satelit (Phobos dan Deimos)",
      "Atmospér tipis dengan CO₂",
      "Suhu rata-rata: -65°C",
    ],
  },
  jupiter: {
    name: "Jupiter",
    diameter: "139,820 km",
    distance: "778.5 juta km dari Matahari",
    description:
      "Planet terbesar di Tata Surya dengan Besar Merah Besar (Great Red Spot) sebagai ciri khasnya. Jupiter adalah planet gas raksasa.",
    characteristics: ["Planet terbesar", "95+ satelit", "Terdiri dari gas (H₂ dan He)", "Cincin planet"],
  },
  saturn: {
    name: "Saturnus",
    diameter: "116,460 km",
    distance: "1.43 miliar km dari Matahari",
    description:
      "Dikenal karena sistem cincinnya yang spektakuler. Saturnus adalah planet gas raksasa kedua terbesar setelah Jupiter.",
    characteristics: ["Sistem cincin paling indah", "146+ satelit", "Kepekatan: 0.687 g/cm³", "Dapat mengapung di air"],
  },
  uranus: {
    name: "Uranus",
    diameter: "50,724 km",
    distance: "2.87 miliar km dari Matahari",
    description:
      "Planet dengan warna biru-hijau karena metana di atmosfernya. Uranus berputar dengan kemiringan ekstrem.",
    characteristics: ["Sumbu rotasi miring 98°", "27+ satelit", "Atmosfer mengandung metana", "Es raksasa"],
  },
  neptune: {
    name: "Neptunus",
    diameter: "49,244 km",
    distance: "4.50 miliar km dari Matahari",
    description:
      "Planet terjauh dari Matahari dengan warna biru dalam. Neptunus memiliki angin tercepat di Tata Surya.",
    characteristics: ["Angin tercepat: 2,100 km/jam", "14+ satelit", "Es raksasa", "Suhu: -220°C"],
  },
}

export default function PlanetInfo({ selectedPlanet }: PlanetInfoProps) {
  const planet = PLANET_DATA[selectedPlanet]

  if (!planet) return null

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">{planet.name}</h2>
        <p className="text-sm text-foreground/60">{planet.distance}</p>
      </div>

      {/* Diameter */}
      <div className="bg-muted/50 p-4 rounded-lg border border-border">
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Diameter</p>
        <p className="text-lg font-semibold text-accent">{planet.diameter}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-foreground/80 leading-relaxed text-sm">{planet.description}</p>
      </div>

      {/* Characteristics */}
      <div>
        <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">Karakteristik</h3>
        <ul className="space-y-2">
          {planet.characteristics.map((char, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent mt-1">★</span>
              <span className="text-sm text-foreground/80">{char}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
