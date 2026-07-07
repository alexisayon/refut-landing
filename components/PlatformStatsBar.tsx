import React from 'react'
import { platformStats } from '../lib/landingContent'

interface PlatformStatsBarProps {
  className?: string
}

const PlatformStatsBar: React.FC<PlatformStatsBarProps> = ({ className = '' }) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${className}`}
      aria-label="Estadísticas de la plataforma"
    >
      {platformStats.map((stat) => (
        <div
          key={stat.id}
          className="bg-dark-surface/80 border border-dark-border rounded-xl px-4 py-5 text-center backdrop-blur-sm"
        >
          <p className="text-3xl md:text-4xl font-bold text-white tabular-nums">{stat.value}</p>
          <p className="text-xs md:text-sm text-white/60 mt-1">{stat.label}</p>
        </div>
      ))}
      <p className="col-span-full text-center text-white/40 text-xs mt-1">
        Cifras orientativas de la red ReFut en la ZMG
      </p>
    </div>
  )
}

export default PlatformStatsBar
