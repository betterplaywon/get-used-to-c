import { runOnJudge0, type Judge0Result } from '@/shared/api/judge0';
import { formatResult, toErrorMessage } from '@/shared/lib/formatResult';
import { usePlaygroundStore } from './store';

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
