import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CodeEditor, type EditorLanguage } from '../editor/CodeEditor';
import { parseCompilerOutput } from '../runner/errorMarkers';
import { useTutorialRunner } from './useTutorialRunner';

type StepRunnerProps = {
  initialCode: string;
  language: EditorLanguage;
  expectedStdout?: string;
  hint?: string;
};

export function StepRunner({ initialCode, language, expectedStdout, hint }: StepRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const { state, run, reset } = useTutorialRunner();

  const diagnostics = useMemo(() => parseCompilerOutput(state.compileOutput), [state.compileOutput]);

  const isRunning = state.status === 'running';
  const matchesExpected =
    state.status === 'done' && expectedStdout != null && state.output === expectedStdout;

  return (
    <Stack sx={{ gap: 2, height: '100%', minHeight: 0 }}>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          variant="text"
          size="small"
          startIcon={<RestartAltIcon />}
          disabled={isRunning || code === initialCode}
          onClick={() => {
            setCode(initialCode);
            reset();
          }}
        >
          초기 코드로
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={isRunning}
          startIcon={
            isRunning ? <CircularProgress size={16} color="inherit" /> : <PlayArrowIcon />
          }
          onClick={() => run({ source: code, language })}
        >
          실행
        </Button>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 240 }}>
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
          diagnostics={diagnostics}
        />
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1.5,
          backgroundColor: 'grey.50',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 14,
          whiteSpace: 'pre-wrap',
          minHeight: 96,
          maxHeight: 220,
          overflow: 'auto',
        }}
      >
        <RunnerOutput state={state} />
      </Box>

      {expectedStdout != null && state.status === 'done' && (
        <Typography
          variant="caption"
          color={matchesExpected ? 'success.main' : 'text.secondary'}
        >
          {matchesExpected ? '예상 출력과 일치합니다.' : '예상 출력과 다릅니다. 코드를 다시 살펴보세요.'}
        </Typography>
      )}

      {hint && state.status === 'error' && (
        <Typography variant="caption" color="text.secondary">
          힌트: {hint}
        </Typography>
      )}
    </Stack>
  );
}

type RunnerOutputProps = {
  state: ReturnType<typeof useTutorialRunner>['state'];
};

function RunnerOutput({ state }: RunnerOutputProps) {
  if (state.status === 'running') {
    return (
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={16} />
        <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
          실행 중...
        </Typography>
      </Stack>
    );
  }
  if (state.status === 'error') {
    return (
      <Box sx={{ color: 'error.main', fontFamily: 'inherit', fontSize: 'inherit' }}>
        {state.errorMessage ?? '알 수 없는 오류가 발생했습니다.'}
      </Box>
    );
  }
  if (state.status === 'idle' && !state.output) {
    return (
      <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
        실행 버튼을 눌러 결과를 확인하세요.
      </Typography>
    );
  }
  return <>{state.output}</>;
}
