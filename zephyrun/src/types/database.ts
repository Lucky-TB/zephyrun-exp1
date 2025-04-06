export type TerrainType = 'pavement' | 'trail' | 'gravel' | 'mixed';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TrainingGoalType = 'distance' | 'speed' | 'endurance' | 'recovery';
export type ConditionType = 'weather' | 'maintenance' | 'hazard';
export type ConditionSeverity = 'low' | 'medium' | 'high';

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  preferred_terrain: TerrainType[];
  experience_level: ExperienceLevel;
  physical_limitations: string[];
  training_goals: TrainingGoal[];
  created_at: string;
  updated_at: string;
}

export interface TrainingGoal {
  type: TrainingGoalType;
  target: number;
  unit: string;
  deadline?: string;
}

export interface Route {
  id: string;
  name: string;
  description?: string;
  distance: number;
  elevation: number;
  terrain: TerrainType[];
  difficulty: number;
  coordinates: GeoJSON.LineString;
  created_by: string;
  is_public: boolean;
  ai_analysis?: any;
  created_at: string;
  updated_at: string;
}

export interface RouteRating {
  id: string;
  route_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface TrailCondition {
  id: string;
  route_id: string;
  reported_by: string;
  condition_type: ConditionType;
  description: string;
  severity: ConditionSeverity;
  location?: GeoJSON.Point;
  resolved: boolean;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by: string;
  terrain_type?: TerrainType[];
  min_distance?: number;
  max_distance?: number;
  min_elevation?: number;
  max_elevation?: number;
  created_at: string;
  updated_at: string;
}

export interface ChallengeParticipant {
  id: string;
  challenge_id: string;
  user_id: string;
  joined_at: string;
  completed: boolean;
  completed_at?: string;
}

export interface RunningGroup {
  id: string;
  name: string;
  description?: string;
  location?: GeoJSON.Point;
  created_by: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export interface UserRun {
  id: string;
  user_id: string;
  route_id?: string;
  distance: number;
  duration: number;
  elevation_gain?: number;
  elevation_loss?: number;
  avg_pace?: number;
  terrain_types?: TerrainType[];
  notes?: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      routes: {
        Row: Route;
        Insert: Omit<Route, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Route, 'id'>>;
      };
      route_ratings: {
        Row: RouteRating;
        Insert: Omit<RouteRating, 'id' | 'created_at'>;
        Update: Partial<Omit<RouteRating, 'id'>>;
      };
      trail_conditions: {
        Row: TrailCondition;
        Insert: Omit<TrailCondition, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TrailCondition, 'id'>>;
      };
      challenges: {
        Row: Challenge;
        Insert: Omit<Challenge, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Challenge, 'id'>>;
      };
      challenge_participants: {
        Row: ChallengeParticipant;
        Insert: Omit<ChallengeParticipant, 'id' | 'joined_at'>;
        Update: Partial<Omit<ChallengeParticipant, 'id'>>;
      };
      running_groups: {
        Row: RunningGroup;
        Insert: Omit<RunningGroup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<RunningGroup, 'id'>>;
      };
      group_members: {
        Row: GroupMember;
        Insert: Omit<GroupMember, 'id' | 'joined_at'>;
        Update: Partial<Omit<GroupMember, 'id'>>;
      };
      user_runs: {
        Row: UserRun;
        Insert: Omit<UserRun, 'id' | 'created_at'>;
        Update: Partial<Omit<UserRun, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      terrain_type: TerrainType;
      experience_level: ExperienceLevel;
      training_goal_type: TrainingGoalType;
      condition_type: ConditionType;
      condition_severity: ConditionSeverity;
    };
  };
} 