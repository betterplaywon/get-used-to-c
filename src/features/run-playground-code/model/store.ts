import { create } from 'zustand';
import type { EditorLanguage } from '@/shared/types/code';
import { SAMPLE_C_HELLO } from '@/shared/config/samples';

export type PlaygroundStatus = 'idle' | 'running' | 'done' | 'error';

type PlaygroundState = {
  code: string;
  language: EditorLanguage;
  stdin: string;
  output: string;
  status: PlaygroundStatus;
  errorMessage: string | null;
  compileOutput: string | null;
  setCode: (code: string) => void;
  setLanguage: (language: EditorLanguage) => void;
  setStdin: (stdin: string) => void;
  startRun: () => void;
  succeed: (output: string) => void;
  fail: (message: string, compileOutput?: string | null) => void;
};

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: SAMPLE_C_HELLO,
  language: 'c',
  stdin: '',
  output: '',
  status: 'idle',
  errorMessage: null,
  compileOutput: null,
  setCode: (code) => set({ code, compileOutput: null }),
  setLanguage: (language) => set({ language }),
  setStdin: (stdin) => set({ stdin }),
  startRun: () =>
    set({ status: 'running', output: '', errorMessage: null, compileOutput: null }),
  succeed: (output) =>
    set({ status: 'done', output, errorMessage: null, compileOutput: null }),
  fail: (message, compileOutput = null) =>
    set({ status: 'error', output: '', errorMessage: message, compileOutput }),
}));
