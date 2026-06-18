export type Difficulty = "Pemula" | "Menengah" | "Lanjutan";

export interface Lesson {
  code: string; slug: string; title: string; summary: string; duration: string; difficulty: Difficulty;
  objectives: string[]; concepts: string[]; content: string[]; examples: string[];
  exercises: string[]; prompts: string[]; quiz: string[]; assignments: string[]; notes: string[];
}
export interface CourseModule {
  number: number; slug: string; title: string; description: string; difficulty: Difficulty;
  duration: string; outcomes: string[]; tools: string[]; project: string; lessons: Lesson[];
}
export interface DirectoryItem {
  slug?: string; title: string; category: string; level: Difficulty; tag: string; description: string;
  details: string[]; action?: string; sections?: Array<{ title: string; content: string | string[] }>;
}
export interface RoadmapLevel {
  level: number; title: string; forWho: string; learn: string; tools: string[]; lessons: string; output: string; project: string;
}
export interface SkillCheckQuestion { question: string; options: { label: string; score: number }[] }
