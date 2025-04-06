
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rxidgaktkqldikcwpfnb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aWRnYWt0a3FsZGlrY3dwZm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODAzMDgsImV4cCI6MjA1NjY1NjMwOH0.ycLv4wQZNwpwJAS2YU5Nb90RTYtW8Hr_tjQMsrzXSiw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Custom types for our database tables
export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  interests?: string[];
  impact_score?: number;
  created_at?: string;
  updated_at?: string;
}

export interface NGO {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  cover_image_url?: string;
  category?: string;
  location?: string;
  impact_metrics?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  ngo_id: string;
  title: string;
  description?: string;
  image_url?: string;
  post_type: string;
  action_data?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface UserAction {
  id: string;
  user_id: string;
  post_id: string;
  action_type: string;
  action_details?: Record<string, any>;
  transaction_id?: string;
  created_at?: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at?: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  requirements?: Record<string, any>;
  created_at?: string;
}

export interface UserNGOMatch {
  id: string;
  user_id: string;
  ngo_id: string;
  match_score: number;
  is_adopted?: boolean;
  created_at?: string;
  updated_at?: string;
  ngos?: NGO;
}
