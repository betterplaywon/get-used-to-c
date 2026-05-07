import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Stack sx={{ gap: 3, alignItems: 'center', py: 8 }}>
      <Typography variant="h1">404</Typography>
      <Typography color="text.secondary">요청하신 페이지를 찾을 수 없습니다.</Typography>
      <Button component={RouterLink} to="/" variant="contained">
        홈으로
      </Button>
    </Stack>
  );
}
