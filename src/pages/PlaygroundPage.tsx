import { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CodeEditor, type EditorLanguage } from '../features/editor/CodeEditor';
import { SAMPLE_C_HELLO } from '../features/editor/samples';

export function PlaygroundPage() {
  const [language, setLanguage] = useState<EditorLanguage>('c');
  const [code, setCode] = useState(SAMPLE_C_HELLO);
  const [output, setOutput] = useState<string>('');

  const handleRun = () => {
    setOutput('(아직 코드 실행 엔진이 연결되지 않았습니다.)');
  };

  return (
    <Stack sx={{ gap: 2, height: 'calc(100vh - 160px)' }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">플레이그라운드</Typography>
        <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={language}
            exclusive
            size="small"
            onChange={(_, v) => v && setLanguage(v)}
          >
            <ToggleButton value="c">C</ToggleButton>
            <ToggleButton value="cpp">C++</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handleRun}>
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
          {output || (
            <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
              실행 버튼을 눌러 결과를 확인하세요.
            </Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
