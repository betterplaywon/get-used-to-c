import { Judge0ConfigError, Judge0NetworkError, type Judge0Result } from '@/shared/api/judge0';

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

export function toErrorMessage(error: unknown): string {
  if (error instanceof Judge0ConfigError || error instanceof Judge0NetworkError) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
}
