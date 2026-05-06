import { usePlaygroundStore } from '../../store/playgroundStore';
import {
  Judge0ConfigError,
  Judge0NetworkError,
  runOnJudge0,
  type Judge0Result,
} from '../../lib/judge0';
import { formatResult } from './formatResult';

export function useRunCode(): { run: () => Promise<void> } {
  const startRun = usePlaygroundStore((s) => s.startRun);
  const succeed = usePlaygroundStore((s) => s.succeed);
  const fail = usePlaygroundStore((s) => s.fail);

  const run = async () => {
    const { code, language, stdin } = usePlaygroundStore.getState();
    startRun();

    let result: Judge0Result;
    try {
      result = await runOnJudge0({ source: code, language, stdin });
    } catch (error) {
      fail(toErrorMessage(error));
      return;
    }

    const formatted = formatResult(result);
    if (formatted.kind === 'compile_error') {
      fail(formatted.text, result.compileOutput);
      return;
    }
    if (formatted.kind === 'runtime_error') {
      fail(formatted.text);
      return;
    }
    succeed(formatted.text);
  };

  return { run };
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Judge0ConfigError || error instanceof Judge0NetworkError) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
}
