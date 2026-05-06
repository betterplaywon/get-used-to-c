import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TUTORIALS } from './content';

export function TutorialList() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3,
      }}
    >
      {TUTORIALS.map((tutorial, index) => (
        <Card key={tutorial.slug} variant="outlined">
          <CardActionArea component={RouterLink} to={`/tutorials/${tutorial.slug}`}>
            <CardContent>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography variant="h3">{tutorial.title}</Typography>
                <Typography color="text.secondary">{tutorial.summary}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {tutorial.steps.length}단계
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
