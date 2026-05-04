import { Stack, Typography } from '@mui/material';

export function PlaygroundPage() {
  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="h1">플레이그라운드</Typography>
      <Typography color="text.secondary">
        준비 중입니다. Monaco 에디터, 실행 결과, 메모리 시각화가 이곳에 표시됩니다.
      </Typography>
    </Stack>
  );
}
