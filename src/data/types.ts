export type Difficulty = "Pemula" | "Menengah" | "Lanjutan";

export interface LessonConcept {
  title: string;
  explanation: string;
  whyItMatters: string;
  example: string;
  commonMistake?: string;
}

export interface Lesson {
  code: string; slug: string; title: string; summary: string; duration: string; difficulty: Difficulty;
  prerequisites: string[]; learningObjective: string; objectives: string[]; concepts: LessonConcept[];
  content: string[]; examples: string[]; exercises: string[]; prompts: string[]; quiz: string[];
  assignments: string[]; notes: string[]; nextStep: string; relatedGlossary: string[];
}
export interface CourseModule {
  number: number; slug: string; title: string; description: string; difficulty: Difficulty;
  duration: string; outcomes: string[]; tools: string[]; project: string; lessons: Lesson[];
}
export interface DirectoryItem {
  slug?: string; title: string; category: string; level: Difficulty; tag: string; description: string;
  details: string[]; action?: string; industry?: string; trigger?: string; inputs?: string[];
  approvalPoints?: string[]; failureModes?: string[]; outputs?: string[]; kpi?: string[];
  estimatedSetup?: string; officialUrl?: string; docsUrl?: string; lastVerified?: string;
  sourceUrls?: string[]; pricingLabel?: "Free" | "Freemium" | "Paid" | "Enterprise";
  platforms?: string[]; bestFor?: string[]; notFor?: string[]; privacyNote?: string;
  sections?: Array<{ title: string; content: string | string[] }>;
}
export interface RoadmapLevel {
  level: number; title: string; forWho: string; learn: string; tools: string[]; lessons: string; output: string; project: string; moduleSlug: string;
}
export interface SkillCheckQuestion { question: string; options: { label: string; score: number }[] }
