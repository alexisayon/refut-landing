import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { FaClock, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'
import { COURTS_CATALOG_DISCLAIMER, courtZones, featuredLocations, type CourtZone } from '../../lib/landingContent'
import { event } from '../../lib/gtag'

const CourtsCatalogSection: React.FC = () => {
  const [zone, setZone] = useState<CourtZone>('Todas')

  const filtered = useMemo(() => {
    if (zone === 'Todas') return featuredLocations
    return featuredLocations.filter((loc) => loc.zone === zone)
  }, [zone])

  const trackReserve = (locationId: string) => {
    event({ action: 'court_catalog_click', category: 'conversion', label: locationId })
  }

  return (
    <section id="canchas" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-refut-green font-medium text-sm uppercase tracking-wide mb-3">
            Red ReFut · ZMG
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Encuentra tu cancha</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Canchas de socios ReFut en Guadalajara y zona metropolitana. Filtra por zona y reserva
            desde la app.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filtrar por zona">
          {courtZones.map((z) => (
            <button
              key={z}
              type="button"
              role="tab"
              aria-selected={zone === z}
              onClick={() => setZone(z)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green ${
                zone === z
                  ? 'bg-refut-green text-white'
                  : 'bg-dark-card border border-dark-border text-white/70 hover:text-white hover:border-refut-green/40'
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((location) => {
            const minPrice = Math.min(...location.spaces.map((s) => s.pricePerHour))
            const href = `${APP_URL}${location.appUrl ?? '/buscar'}`

            return (
              <article
                key={location.id}
                className="flex flex-col bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-refut-green/30 transition-colors"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={location.photoUrl}
                    alt={location.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-refut-black/80 text-white text-xs font-medium">
                    {location.zone}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{location.name}</h3>
                  <p className="text-sm text-white/60 flex items-start gap-1.5 mb-4">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0 mt-0.5 text-refut-green" aria-hidden />
                    {location.address}
                  </p>

                  <p className="text-sm text-white/80 mb-3">
                    {location.spaces.length} espacio{location.spaces.length !== 1 ? 's' : ''} ·{' '}
                    <span className="text-refut-green font-semibold">
                      desde ${minPrice.toLocaleString('es-MX')}/h
                    </span>
                  </p>

                  <ul className="space-y-2 mb-5 flex-1">
                    {location.spaces.map((space) => (
                      <li
                        key={space.id}
                        className="flex items-center justify-between text-xs bg-refut-black/50 rounded-lg px-3 py-2 border border-dark-border"
                      >
                        <span className="text-white/90">
                          Fútbol {space.size} · {space.name}
                        </span>
                        <span className="text-white/50 flex items-center gap-1">
                          <FaClock className="w-3 h-3" aria-hidden />
                          {space.openTime}–{space.closeTime}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackReserve(location.id)}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-refut-green text-white font-semibold text-sm hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green"
                  >
                    Ver en la app
                    <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-80" aria-hidden />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/60 py-12">
            No hay canchas en esta zona por ahora. Prueba otra o escríbenos para sumar la tuya.
          </p>
        )}

        <p className="text-center text-white/40 text-xs mt-8 max-w-xl mx-auto">
          {COURTS_CATALOG_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}

export default CourtsCatalogSection
