
export type NGOCategory = 
  | 'Education' 
  | 'Healthcare' 
  | 'Environment' 
  | 'Animal Welfare' 
  | 'Human Rights' 
  | 'Poverty' 
  | 'Disaster Relief' 
  | 'Arts & Culture' 
  | 'Community Development';

export interface NGO {
  id: string;
  name: string;
  description: string;
  mission: string;
  category: NGOCategory;
  location: string;
  impact: string;
  logo: string;
  coverImage: string;
  featured: boolean;
  matchScore?: number;
  website?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  stats?: {
    peopleHelped: number;
    projectsCompleted: number;
    volunteers: number;
    fundraisingGoal: number;
    fundraisingCurrent: number;
  };
}
