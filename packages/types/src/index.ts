// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  position?: PlayerPosition
  skillLevel?: SkillLevel
  createdAt: Date
  updatedAt: Date
}

export enum PlayerPosition {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  MIDFIELDER = 'midfielder',
  FORWARD = 'forward'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  PROFESSIONAL = 'professional'
}

// Match types
export interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  score: MatchScore
  status: MatchStatus
  date: Date
  location?: string
  duration?: number // in minutes
}

export interface MatchScore {
  home: number
  away: number
}

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled'
}

// Team types
export interface Team {
  id: string
  name: string
  logo?: string
  players: User[]
  captain?: User
  createdAt: Date
}

// Training types
export interface TrainingSession {
  id: string
  title: string
  description: string
  exercises: Exercise[]
  duration: number // in minutes
  difficulty: DifficultyLevel
  category: TrainingCategory
  createdAt: Date
}

export interface Exercise {
  id: string
  name: string
  description: string
  duration: number // in minutes
  repetitions?: number
  instructions: string[]
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum TrainingCategory {
  TECHNICAL = 'technical',
  TACTICAL = 'tactical',
  PHYSICAL = 'physical',
  MENTAL = 'mental'
}

// Analytics types
export interface PlayerStats {
  playerId: string
  matchesPlayed: number
  goals: number
  assists: number
  passes: number
  passAccuracy: number
  tackles: number
  interceptions: number
  rating: number
  period: StatsPeriod
}

export enum StatsPeriod {
  WEEK = 'week',
  MONTH = 'month',
  SEASON = 'season',
  ALL_TIME = 'all_time'
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
