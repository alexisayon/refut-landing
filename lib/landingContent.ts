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
    photoUrl: '/images/courts/court-zapopan.jpg',
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
    photoUrl: '/images/courts/court-centro.jpg',
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
    photoUrl: '/images/courts/court-tlaquepaque.jpg',
    appUrl: '/buscar',
    spaces: [
      { id: 't1', name: 'Cancha 7', size: '7', pricePerHour: 850, openTime: '08:00', closeTime: '22:00' },
    ],
  },
]

export const communityMoments: CommunityMoment[] = [
  {
    id: 'm1',
    src: '/images/community/moment-1.jpg',
    alt: 'Partido amateur en cancha',
    caption: 'Retas entre amigos',
  },
  {
    id: 'm2',
    src: '/images/community/moment-2.jpg',
    alt: 'Jugadores celebrando gol',
    caption: 'Torneo mixto',
  },
  {
    id: 'm3',
    src: '/images/community/moment-3.jpg',
    alt: 'Equipo en cancha de fútbol 7',
    caption: 'Liga amateur ZMG',
  },
  {
    id: 'm4',
    src: '/images/community/moment-4.jpg',
    alt: 'Balón en cancha sintética',
    caption: 'Domingo de fútbol',
  },
  {
    id: 'm5',
    src: '/images/community/moment-5.jpg',
    alt: 'Grupo de jugadores',
    caption: 'Comunidad ReFut',
  },
  {
    id: 'm6',
    src: '/images/community/moment-6.jpg',
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
  photoUrl: '/images/partners/partner-network.jpg',
}
