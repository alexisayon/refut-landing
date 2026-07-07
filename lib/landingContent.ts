export interface PlatformStat {
  id: string
  value: string
  label: string
}

export interface CourtSpace {
  id: string
  name: string
  size: string
  pricePerHour: number
  openTime: string
  closeTime: string
}

export interface FeaturedLocation {
  id: string
  name: string
  address: string
  zone: string
  photoUrl: string
  spaces: CourtSpace[]
  appUrl?: string
}

export interface CommunityMoment {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface PartnerSpotlight {
  name: string
  tagline: string
  description: string
  since: string
  metrics: { value: string; label: string }[]
  photoUrl: string
}

export const platformStats: PlatformStat[] = [
  { id: 'socios', value: '10+', label: 'Socios en la red (objetivo)' },
  { id: 'canchas', value: '25+', label: 'Canchas conectadas (objetivo)' },
  { id: 'torneos', value: '8+', label: 'Torneos activos (objetivo)' },
  { id: 'jugadores', value: '500+', label: 'Jugadores en la ZMG (objetivo)' },
]

/** Catálogo ilustrativo hasta integrar socios reales en la app. */
export const COURTS_CATALOG_DISCLAIMER =
  'Ejemplos representativos de la red ReFut. Disponibilidad y precios reales en la app.'

export const courtZones = ['Todas', 'Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá'] as const

export type CourtZone = (typeof courtZones)[number]

export const featuredLocations: FeaturedLocation[] = [
  {
    id: 'zapopan-norte',
    name: 'Complejo Deportivo Zapopan Norte (ejemplo)',
    address: 'Av. Patria, Zapopan, Jal.',
    zone: 'Zapopan',
    photoUrl:
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
    appUrl: '/buscar',
    spaces: [
      { id: 'z1', name: 'Cancha 7', size: '7', pricePerHour: 1200, openTime: '08:00', closeTime: '22:00' },
      { id: 'z2', name: 'Cancha 7', size: '7', pricePerHour: 1200, openTime: '08:00', closeTime: '22:00' },
    ],
  },
  {
    id: 'centro-gdl',
    name: 'Arena Fútbol Centro (ejemplo)',
    address: 'Col. Americana, Guadalajara, Jal.',
    zone: 'Guadalajara',
    photoUrl:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    appUrl: '/buscar',
    spaces: [
      { id: 'c1', name: 'Cancha 5', size: '5', pricePerHour: 900, openTime: '07:00', closeTime: '23:00' },
      { id: 'c2', name: 'Cancha 7', size: '7', pricePerHour: 1100, openTime: '07:00', closeTime: '23:00' },
      { id: 'c3', name: 'Cancha 11', size: '11', pricePerHour: 1400, openTime: '08:00', closeTime: '21:00' },
    ],
  },
  {
    id: 'tlaquepaque-sur',
    name: 'Canchas Tlaquepaque Sur (ejemplo)',
    address: 'El Salto, Tlaquepaque, Jal.',
    zone: 'Tlaquepaque',
    photoUrl:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
    appUrl: '/buscar',
    spaces: [
      { id: 't1', name: 'Cancha 7', size: '7', pricePerHour: 850, openTime: '08:00', closeTime: '22:00' },
    ],
  },
]

export const communityMoments: CommunityMoment[] = [
  {
    id: 'm1',
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    alt: 'Partido amateur en cancha',
    caption: 'Retas entre amigos',
  },
  {
    id: 'm2',
    src: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80',
    alt: 'Jugadores celebrando gol',
    caption: 'Torneo mixto',
  },
  {
    id: 'm3',
    src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=600&q=80',
    alt: 'Equipo en cancha de fútbol 7',
    caption: 'Liga amateur ZMG',
  },
  {
    id: 'm4',
    src: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80',
    alt: 'Balón en cancha sintética',
    caption: 'Domingo de fútbol',
  },
  {
    id: 'm5',
    src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    alt: 'Grupo de jugadores',
    caption: 'Comunidad ReFut',
  },
  {
    id: 'm6',
    src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
    alt: 'Partido nocturno',
    caption: 'Noche de reta',
  },
]

export const partnerSpotlight: PartnerSpotlight = {
  name: 'Red de socios ReFut',
  tagline: 'Canchas y torneos que operan con nosotros (referencia)',
  description:
    'Desde complejos con varias sedes hasta organizadores de ligas amateur, los socios ReFut centralizan reservas, competencias y visibilidad en la Zona Metropolitana de Guadalajara.',
  since: '2024',
  metrics: [
    { value: '10+', label: 'Socios activos' },
    { value: '25+', label: 'Canchas en red' },
    { value: '8+', label: 'Torneos operados' },
  ],
  photoUrl:
    'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80',
}
