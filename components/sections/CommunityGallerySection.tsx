import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { communityMoments } from '../../lib/landingContent'

const CommunityGallerySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = communityMoments.find((m) => m.id === activeId)

  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeId, close])

  return (
    <section id="comunidad" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Momentos de la comunidad
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Retas, torneos y partidos reales de jugadores en la ZMG. Toca una foto para verla en grande.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {communityMoments.map((moment) => (
            <button
              key={moment.id}
              type="button"
              onClick={() => setActiveId(moment.id)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-dark-border focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
            >
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {moment.caption && (
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-refut-black/90 to-transparent px-3 py-3 text-left text-xs text-white/90">
                  {moment.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-refut-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-refut-green"
            aria-label="Cerrar"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="90vw" />
          </div>
          {active.caption && (
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
              {active.caption}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

export default CommunityGallerySection
