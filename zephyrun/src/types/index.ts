export interface User {
  id: string;
  email: string;
  username: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  preferredTerrain: TerrainType[];
  experienceLevel: ExperienceLevel;
  physicalLimitations: string[];
  trainingGoals: TrainingGoal[];
}

export type TerrainType = 'pavement' | 'trail' | 'gravel' | 'mixed';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface TrainingGoal {
  type: 'distance' | 'speed' | 'endurance' | 'recovery';
  target: number;
  unit: 'km' | 'min/km' | 'minutes';
}

export interface Route {
  id: string;
  name: string;
  description: string;
  distance: number;
  elevation: number;
  terrain: TerrainType[];
  difficulty: number;
  coordinates: Coordinate[];
  createdAt: Date;
  createdBy: string;
  ratings: RouteRating[];
  conditions: TrailCondition[];
}

export interface Coordinate {
  latitude: number;
  longitude: number;
  elevation?: number;
}

export interface RouteRating {
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface TrailCondition {
  type: 'weather' | 'maintenance' | 'hazard';
  description: string;
  severity: 'low' | 'medium' | 'high';
  reportedBy: string;
  reportedAt: Date;
  resolvedAt?: Date;
} 