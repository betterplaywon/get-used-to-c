import { usePlaygroundStore } from '../../store/playgroundStore';
import { Judge0ConfigError, Judge0NetworkError, runOnJudge0 } from '../../lib/judge0';
import { formatResult } from './formatResult';

export function useRunCode(): { run: () => Promise<void> } {
  const startRun = usePlaygroundStore((s) => s.startRun);
  const succeed = usePlaygroundStore((s) => s.succeed);
  const fail = usePlaygroundStore((s) => s.fail);

  const run = async () => {
    const { code, language } = usePlaygroundStore.getState();
    startRun();
    try {
      const result = await runOnJudge0({ source: code, language });
      const formatted = formatResult(result);
      succeed(formatted.text);
    } catch (error) {
      if (error instanceof Judge0ConfigError || error instanceof Judge0NetworkError) {
        fail(error.message);
        return;
      }
      fail('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return { run };
}
