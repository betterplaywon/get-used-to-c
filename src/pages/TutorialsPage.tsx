import { Stack, Typography } from '@mui/material';
import { TutorialList } from '../features/tutorial/TutorialList';

export function TutorialsPage() {
  return (
    <Stack sx={{ gap: 4 }}>
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h1">튜토리얼</Typography>
        <Typography color="text.secondary">
          C/C++의 기본 개념을 입문부터 배열까지 단계별로 따라가며 익혀봅니다. 각 단원은 짧은 설명과 그 자리에서 실행할 수 있는 예제로 구성되어 있습니다.
        </Typography>
      </Stack>
      <TutorialList />
    </Stack>
  );
}
