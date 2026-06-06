import type { Mood, ReactionType } from "@/types";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      poems: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          mood: Mood;
          cover_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          mood: Mood;
          cover_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["poems"]["Insert"]>;
      };
      comments: {
        Row: {
          id: string;
          poem_id: string;
          name: string;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          poem_id: string;
          name: string;
          comment: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
      };
      reactions: {
        Row: {
          id: string;
          poem_id: string;
          reaction_type: ReactionType;
          created_at: string;
        };
        Insert: {
          id?: string;
          poem_id: string;
          reaction_type: ReactionType;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reactions"]["Insert"]>;
      };
      users: {
        Row: { id: string; email: string; role: "admin" | "editor" | "reader" };
        Insert: { id?: string; email: string; role?: "admin" | "editor" | "reader" };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
