import { useMemo } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CodeEditor } from '@/shared/ui/CodeEditor';
import { ExecutionOutput } from '@/shared/ui/ExecutionOutput';
import { parseCompilerOutput } from '@/shared/lib/errorMarkers';
import { MONOSPACE_FONT_FAMILY } from '@/shared/config/theme';
import { useRunCode, usePlaygroundStore } from '@/features/run-playground-code';

export function PlaygroundPage() {
  const code = usePlaygroundStore((s) => s.code);
  const language = usePlaygroundStore((s) => s.language);
  const stdin = usePlaygroundStore((s) => s.stdin);
  const output = usePlaygroundStore((s) => s.output);
  const status = usePlaygroundStore((s) => s.status);
  const errorMessage = usePlaygroundStore((s) => s.errorMessage);
  const compileOutput = usePlaygroundStore((s) => s.compileOutput);
  const setCode = usePlaygroundStore((s) => s.setCode);
  const setLanguage = usePlaygroundStore((s) => s.setLanguage);
  const setStdin = usePlaygroundStore((s) => s.setStdin);

  const { run } = useRunCode();
  const isRunning = status === 'running';

  const diagnostics = useMemo(() => parseCompilerOutput(compileOutput), [compileOutput]);

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
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
          diagnostics={diagnostics}
        />
        <Stack sx={{ gap: 2, minHeight: 0 }}>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              표준 입력 (stdin)
            </Typography>
            <TextField
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="프로그램에 전달할 입력값을 한 줄씩 입력하세요"
              multiline
              minRows={2}
              maxRows={4}
              disabled={isRunning}
              slotProps={{
                input: {
                  sx: {
                    fontFamily: MONOSPACE_FONT_FAMILY,
                    fontSize: 14,
                  },
                },
              }}
            />
          </Stack>
          <ExecutionOutput
            status={status}
            output={output}
            errorMessage={errorMessage}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
