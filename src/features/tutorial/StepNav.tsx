import { Button, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type StepNavProps = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
};

export function StepNav({
  current,
  total,
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음',
  prevDisabled,
  nextDisabled,
}: StepNavProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        onClick={onPrev}
        disabled={prevDisabled}
      >
        {prevLabel}
      </Button>
      <Typography variant="caption" color="text.secondary">
        {current + 1} / {total}
      </Typography>
      <Button
        variant="contained"
        endIcon={<ChevronRightIcon />}
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    </Stack>
  );
}
