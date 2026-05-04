import {
  Box,
  Button,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CodeEditor } from '../features/editor/CodeEditor';
import { useRunCode } from '../features/runner/useRunCode';
import { usePlaygroundStore } from '../store/playgroundStore';

export function PlaygroundPage() {
  const code = usePlaygroundStore((s) => s.code);
  const language = usePlaygroundStore((s) => s.language);
  const output = usePlaygroundStore((s) => s.output);
  const status = usePlaygroundStore((s) => s.status);
  const errorMessage = usePlaygroundStore((s) => s.errorMessage);
  const setCode = usePlaygroundStore((s) => s.setCode);
  const setLanguage = usePlaygroundStore((s) => s.setLanguage);

  const { run } = useRunCode();
  const isRunning = status === 'running';

  return (
    <Stack sx={{ gap: 2, height: 'calc(100vh - 160px)' }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">플레이그라운드</Typography>
        <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={language}
            exclusive
            size="small"
            disabled={isRunning}
            onChange={(_, v) => v && setLanguage(v)}
          >
            <ToggleButton value="c">C</ToggleButton>
            <ToggleButton value="cpp">C++</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            disabled={isRunning}
            startIcon={
              isRunning ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />
            }
            onClick={run}
          >
            실행
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, flex: 1, minHeight: 0 }}>
        <CodeEditor value={code} onChange={setCode} language={language} />
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            backgroundColor: 'grey.50',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            fontSize: 14,
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
          }}
        >
          <PlaygroundOutput
            status={status}
            output={output}
            errorMessage={errorMessage}
          />
        </Box>
      </Box>
    </Stack>
  );
}

type PlaygroundOutputProps = {
  status: ReturnType<typeof usePlaygroundStore.getState>['status'];
  output: string;
  errorMessage: string | null;
};

function PlaygroundOutput({ status, output, errorMessage }: PlaygroundOutputProps) {
  if (status === 'running') {
    return (
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
          실행 중...
        </Typography>
      </Stack>
    );
  }

  if (status === 'error') {
    return (
      <Box sx={{ color: 'error.main', fontFamily: 'inherit', fontSize: 'inherit' }}>
        {errorMessage ?? '알 수 없는 오류가 발생했습니다.'}
      </Box>
    );
  }

  if (status === 'idle' && !output) {
    return (
      <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
        실행 버튼을 눌러 결과를 확인하세요.
      </Typography>
    );
  }

  return <>{output}</>;
}
