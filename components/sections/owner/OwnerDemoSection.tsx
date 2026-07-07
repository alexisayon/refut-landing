import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ownerDemoSlides } from '../../../lib/ownerContent'
import { event } from '../../../lib/gtag'

const OwnerDemoSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = ownerDemoSlides[activeIndex]

  useEffect(() => {
    event({ action: 'demo_view', category: 'engagement', label: activeSlide.id })
  }, [activeSlide.id])

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ownerDemoSlides.length - 1 : prev - 1))
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev === ownerDemoSlides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="demo-duenos" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Así se ve el panel de administración
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Vista previa de las herramientas para operar canchas, ligas y torneos.
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-[16/10] bg-refut-black">
            <Image
              key={activeSlide.id}
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{activeSlide.title}</h3>
              <p className="text-white/70 text-sm">{activeSlide.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Anterior"
                className="p-2 rounded-lg border border-dark-border text-white/80 hover:text-white hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {ownerDemoSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Ver ${slide.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-refut-green' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Siguiente"
                className="p-2 rounded-lg border border-dark-border text-white/80 hover:text-white hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OwnerDemoSection
