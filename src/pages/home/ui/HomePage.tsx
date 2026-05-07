import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function HomePage() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h1" gutterBottom>
          C/C++을 직접 보면서 익히기
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          포인터, 메모리, 동적 할당. 코드 한 줄마다 어떻게 동작하는지 시각화로 확인하세요.
        </Typography>
        <Stack sx={{ flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
          <Button component={RouterLink} to="/tutorials" variant="contained" size="large">
            튜토리얼 시작하기
          </Button>
          <Button component={RouterLink} to="/playground" variant="outlined" size="large">
            자유 코딩
          </Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" gutterBottom>단계별 튜토리얼</Typography>
            <Typography color="text.secondary">
              변수, 포인터, 배열, 동적 할당까지 손으로 코드를 고쳐가며 학습합니다.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" gutterBottom>메모리 시각화</Typography>
            <Typography color="text.secondary">
              스택과 힙에 변수가 어떻게 놓이고 포인터가 어디를 가리키는지 한눈에.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" gutterBottom>자유 코딩</Typography>
            <Typography color="text.secondary">
              빈 에디터에서 알고리즘이나 토이 프로젝트를 자유롭게 실험할 수 있습니다.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
