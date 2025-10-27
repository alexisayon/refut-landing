export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    position?: PlayerPosition;
    skillLevel?: SkillLevel;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum PlayerPosition {
    GOALKEEPER = "goalkeeper",
    DEFENDER = "defender",
    MIDFIELDER = "midfielder",
    FORWARD = "forward"
}
export declare enum SkillLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    PROFESSIONAL = "professional"
}
export interface Match {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    score: MatchScore;
    status: MatchStatus;
    date: Date;
    location?: string;
    duration?: number;
}
export interface MatchScore {
    home: number;
    away: number;
}
export declare enum MatchStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    FINISHED = "finished",
    CANCELLED = "cancelled"
}
export interface Team {
    id: string;
    name: string;
    logo?: string;
    players: User[];
    captain?: User;
    createdAt: Date;
}
export interface TrainingSession {
    id: string;
    title: string;
    description: string;
    exercises: Exercise[];
    duration: number;
    difficulty: DifficultyLevel;
    category: TrainingCategory;
    createdAt: Date;
}
export interface Exercise {
    id: string;
    name: string;
    description: string;
    duration: number;
    repetitions?: number;
    instructions: string[];
}
export declare enum DifficultyLevel {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export declare enum TrainingCategory {
    TECHNICAL = "technical",
    TACTICAL = "tactical",
    PHYSICAL = "physical",
    MENTAL = "mental"
}
export interface PlayerStats {
    playerId: string;
    matchesPlayed: number;
    goals: number;
    assists: number;
    passes: number;
    passAccuracy: number;
    tackles: number;
    interceptions: number;
    rating: number;
    period: StatsPeriod;
}
export declare enum StatsPeriod {
    WEEK = "week",
    MONTH = "month",
    SEASON = "season",
    ALL_TIME = "all_time"
}
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
