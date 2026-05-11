import type { EditorLanguage } from '@/shared/types/code';

export type MemoryVar = {
  name: string;
  type: string;
  value: string;
  address: string;
  note?: string;
};

export type MemoryFrame = {
  name: string;
  vars: MemoryVar[];
};

export type MemorySnapshot = {
  line: number;
  caption?: string;
  frames: MemoryFrame[];
};

export type MemoryTrace = {
  scenario?: string;
  snapshots: MemorySnapshot[];
};

export type TutorialStep = {
  title: string;
  body: string[];
  code?: string;
  language?: EditorLanguage;
  expectedStdout?: string;
  hint?: string;
  memoryTrace?: MemoryTrace;
};

export type Tutorial = {
  slug: string;
  title: string;
  summary: string;
  steps: TutorialStep[];
};
