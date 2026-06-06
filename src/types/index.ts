export const moods = ["ආදර", "විරහ", "මතක", "සතුට", "නිහඬ", "බලාපොරොත්තුව"] as const;

export const reactionTypes = ["Loved It", "Romantic", "Emotional", "Beautiful", "Heartbreaking"] as const;

export type Mood = (typeof moods)[number];
export type ReactionType = (typeof reactionTypes)[number];

export interface Poem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  mood: Mood;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  poem_id: string;
  name: string;
  comment: string;
  created_at: string;
}

export interface Reaction {
  id: string;
  poem_id: string;
  reaction_type: ReactionType;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "editor" | "reader";
}

export interface ReactionSummary {
  reaction_type: ReactionType;
  count: number;
}

export interface AnalyticsSummary {
  poems: number;
  comments: number;
  reactions: number;
  topMood: string;
}
