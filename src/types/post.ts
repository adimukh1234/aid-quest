
export type PostType = 'Donation' | 'Volunteer' | 'Petition' | 'Update';

export interface Post {
  id: string;
  ngoId: string;
  ngoName: string;
  ngoLogo: string;
  postType: PostType;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  actions: {
    donate: boolean;
    volunteer: boolean;
    petition: boolean;
  };
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  // For donation posts
  donation?: {
    goal: string;
    raised: string;
    supporters: number;
    daysLeft: number;
  };
  // For volunteer posts
  volunteer?: {
    needed: number;
    signed: number;
    hoursPerWeek: number;
    duration: string;
  };
  // For petition posts
  petition?: {
    goal: number;
    current: number;
    impact: string;
  };
}
