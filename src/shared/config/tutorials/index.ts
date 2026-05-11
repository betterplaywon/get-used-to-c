import type { Tutorial } from './types';
import { INTRO_TUTORIAL } from './intro';
import { VARIABLES_TUTORIAL } from './variables';
import { OPERATORS_TUTORIAL } from './operators';
import { CONTROL_FLOW_TUTORIAL } from './control-flow';
import { FUNCTIONS_TUTORIAL } from './functions';
import { POINTERS_TUTORIAL } from './pointers';
import { ARRAYS_TUTORIAL } from './arrays';
import { OUTRO_TUTORIAL } from './outro';

export type {
  Tutorial,
  TutorialStep,
  MemoryTrace,
  MemorySnapshot,
  MemoryFrame,
  MemoryVar,
} from './types';

export const TUTORIALS: readonly Tutorial[] = [
  INTRO_TUTORIAL,
  VARIABLES_TUTORIAL,
  OPERATORS_TUTORIAL,
  CONTROL_FLOW_TUTORIAL,
  FUNCTIONS_TUTORIAL,
  POINTERS_TUTORIAL,
  ARRAYS_TUTORIAL,
  OUTRO_TUTORIAL,
];

export function findTutorial(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}

export function findTutorialIndex(slug: string): number {
  return TUTORIALS.findIndex((t) => t.slug === slug);
}
