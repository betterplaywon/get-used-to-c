import { create } from 'zustand';
import type { EditorLanguage } from '../features/editor/CodeEditor';
import { SAMPLE_C_HELLO } from '../features/editor/samples';

export type PlaygroundStatus = 'idle' | 'running' | 'done' | 'error';

type PlaygroundState = {
  code: string;
  language: EditorLanguage;
  output: string;
  status: PlaygroundStatus;
  errorMessage: string | null;
  setCode: (code: string) => void;
  setLanguage: (language: EditorLanguage) => void;
  startRun: () => void;
  succeed: (output: string) => void;
  fail: (message: string) => void;
};

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: SAMPLE_C_HELLO,
  language: 'c',
  output: '',
  status: 'idle',
  errorMessage: null,
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  startRun: () => set({ status: 'running', output: '', errorMessage: null }),
  succeed: (output) => set({ status: 'done', output, errorMessage: null }),
  fail: (message) => set({ status: 'error', output: '', errorMessage: message }),
}));
