import type { Judge0Result } from '../../lib/judge0';

export type FormattedResultKind = 'stdout' | 'compile_error' | 'runtime_error' | 'empty';

export type FormattedResult = {
  text: string;
  kind: FormattedResultKind;
};

export function formatResult(result: Judge0Result): FormattedResult {
  const statusId = result.status.id;

  if (statusId === 6) {
    const detail = result.compileOutput?.trim() ?? result.status.description;
    return { text: `컴파일 에러:\n${detail}`, kind: 'compile_error' };
  }

  if (statusId >= 7) {
    const detail = result.stderr?.trim() || result.status.description;
    return { text: `런타임 에러:\n${detail}`, kind: 'runtime_error' };
  }

  const stdout = result.stdout ?? '';
  if (stdout.length === 0) {
    return { text: '(출력 없음)', kind: 'empty' };
  }

  return { text: stdout, kind: 'stdout' };
}
