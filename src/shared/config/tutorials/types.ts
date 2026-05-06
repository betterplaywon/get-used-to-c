import type { EditorLanguage } from '@/shared/types/code';

export type TutorialStep = {
  title: string;
  body: string[];
  code?: string;
  language?: EditorLanguage;
  expectedStdout?: string;
  hint?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  summary: string;
  steps: TutorialStep[];
};
