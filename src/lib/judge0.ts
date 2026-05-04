export type Judge0Language = 'c' | 'cpp';

export type Judge0Result = {
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
};

export class Judge0ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Judge0ConfigError';
  }
}

export class Judge0NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Judge0NetworkError';
  }
}

const LANGUAGE_IDS: Record<Judge0Language, number> = {
  c: 50,
  cpp: 54,
};

type Judge0SubmissionResponse = {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
  message?: string | null;
};

type RunArgs = {
  source: string;
  language: Judge0Language;
  stdin?: string;
};

export async function runOnJudge0({ source, language, stdin = '' }: RunArgs): Promise<Judge0Result> {
  const baseUrl = import.meta.env.VITE_JUDGE0_URL;
  const apiKey = import.meta.env.VITE_JUDGE0_KEY;
  const apiHost = import.meta.env.VITE_JUDGE0_HOST;

  if (!baseUrl || !apiKey || !apiHost) {
    throw new Judge0ConfigError(
      '코드 실행이 아직 설정되지 않았습니다. (.env에 VITE_JUDGE0_URL, VITE_JUDGE0_KEY, VITE_JUDGE0_HOST 설정 필요)',
    );
  }

  const endpoint = `${baseUrl}/submissions?base64_encoded=false&wait=true`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
      body: JSON.stringify({
        source_code: source,
        language_id: LANGUAGE_IDS[language],
        stdin,
      }),
    });
  } catch {
    throw new Judge0NetworkError('코드 실행 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (response.status === 429) {
    throw new Judge0NetworkError('무료 사용량을 초과했습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (!response.ok) {
    throw new Judge0NetworkError(
      `코드 실행 서버가 오류를 반환했습니다. (HTTP ${response.status})`,
    );
  }

  const data = (await response.json()) as Judge0SubmissionResponse;

  return {
    stdout: data.stdout,
    stderr: data.stderr,
    compileOutput: data.compile_output,
    status: data.status,
    time: data.time,
    memory: data.memory,
  };
}
