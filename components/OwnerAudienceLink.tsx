import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useAudience } from '../hooks/useAudience'
import { trackCta } from '../lib/gtag'

interface OwnerAudienceLinkProps {
  className?: string
  children?: React.ReactNode
  variant?: 'inline' | 'button' | 'banner' | 'footer'
}

const OwnerAudienceLink: React.FC<OwnerAudienceLinkProps> = ({
  className = '',
  children,
  variant = 'inline',
}) => {
  const { setAudience } = useAudience()

  const handleClick = () => {
    trackCta('audience', variant)
    setAudience('duenos')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const label = children ?? '¿Administras canchas o torneos? Ver solución para dueños'

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`text-white/70 hover:text-refut-green transition-colors text-left focus:outline-none focus:ring-2 focus:ring-refut-green rounded ${className}`}
      >
        {label}
      </button>
    )
  }

  if (variant === 'banner') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-full text-left bg-dark-surface border border-refut-green/30 rounded-xl px-5 py-4 hover:border-refut-green/60 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green ${className}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-refut-green text-sm font-semibold uppercase tracking-wide mb-1">
              Para dueños y organizadores
            </p>
            <p className="text-white font-medium">
              Administra canchas, ligas y torneos desde un solo panel
            </p>
          </div>
          <FaArrowRight className="w-4 h-4 text-refut-green shrink-0" aria-hidden />
        </div>
      </button>
    )
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 border border-dark-border text-white px-8 py-3 rounded-xl font-semibold hover:border-refut-green/50 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-dark-surface ${className}`}
      >
        {label}
        <FaArrowRight className="w-4 h-4 opacity-80" aria-hidden />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-refut-green hover:text-accent-greenLight font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded ${className}`}
    >
      {label}
      <FaArrowRight className="w-3.5 h-3.5" aria-hidden />
    </button>
  )
}

export default OwnerAudienceLink
