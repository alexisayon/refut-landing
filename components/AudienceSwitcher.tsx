import React from 'react'
import { useAudience } from '../hooks/useAudience'
import type { Audience } from '../lib/constants'

const options: { value: Audience; label: string }[] = [
  { value: 'duenos', label: 'Dueños / Admin' },
  { value: 'jugadores', label: 'Jugadores' },
]

const AudienceSwitcher: React.FC = () => {
  const { audience, setAudience } = useAudience()

  return (
    <div
      role="tablist"
      aria-label="Audiencia"
      className="inline-flex rounded-xl border border-dark-border bg-dark-surface p-1"
    >
      {options.map((option) => {
        const selected = audience === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => setAudience(option.value)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black ${
              selected
                ? 'bg-refut-green text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default AudienceSwitcher
