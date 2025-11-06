
export interface Resource {
  name: string;
  url: string;
  type: 'video' | 'article' | 'interactive' | 'book' | 'documentation';
}

export interface LearningModule {
  moduleNumber: number;
  title: string;
  description: string;
  subtopics: string[];
  resources: Resource[];
}

export type LearningPath = LearningModule[];
