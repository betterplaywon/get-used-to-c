import { Stack, Typography } from '@mui/material';

export function TutorialsPage() {
  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="h1">튜토리얼</Typography>
      <Typography color="text.secondary">
        준비 중입니다. 튜토리얼 목록과 단계별 학습 화면이 이곳에 표시됩니다.
      </Typography>
    </Stack>
  );
}
