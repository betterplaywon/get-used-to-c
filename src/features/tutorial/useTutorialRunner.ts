import { useCallback, useState } from 'react';
import {
  Judge0ConfigError,
  Judge0NetworkError,
  runOnJudge0,
  type Judge0Result,
} from '../../lib/judge0';
import type { EditorLanguage } from '../editor/CodeEditor';
import { formatResult } from '../runner/formatResult';

export type TutorialRunStatus = 'idle' | 'running' | 'done' | 'error';

export type TutorialRunState = {
  status: TutorialRunStatus;
  output: string;
  errorMessage: string | null;
  compileOutput: string | null;
};

const INITIAL_STATE: TutorialRunState = {
  status: 'idle',
  output: '',
  errorMessage: null,
  compileOutput: null,
};

type RunArgs = {
  source: string;
  language: EditorLanguage;
};

export function useTutorialRunner(): {
  state: TutorialRunState;
  run: (args: RunArgs) => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<TutorialRunState>(INITIAL_STATE);

  const run = useCallback(async ({ source, language }: RunArgs) => {
    setState({ status: 'running', output: '', errorMessage: null, compileOutput: null });

    let result: Judge0Result;
    try {
      result = await runOnJudge0({ source, language });
    } catch (error) {
      setState({
        status: 'error',
        output: '',
        errorMessage: toErrorMessage(error),
        compileOutput: null,
      });
      return;
    }

    const formatted = formatResult(result);
    if (formatted.kind === 'compile_error') {
      setState({
        status: 'error',
        output: '',
        errorMessage: formatted.text,
        compileOutput: result.compileOutput,
      });
      return;
    }
    if (formatted.kind === 'runtime_error') {
      setState({
        status: 'error',
        output: '',
        errorMessage: formatted.text,
        compileOutput: null,
      });
      return;
    }
    setState({
      status: 'done',
      output: formatted.text,
      errorMessage: null,
      compileOutput: null,
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { state, run, reset };
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Judge0ConfigError || error instanceof Judge0NetworkError) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
}
