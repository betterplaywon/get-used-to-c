import { useState } from 'react';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MONOSPACE_FONT_FAMILY } from '@/shared/config/theme';
import type {
  MemoryFrame,
  MemorySnapshot,
  MemoryTrace,
  MemoryVar,
} from '@/shared/config/tutorials';

type MemoryViewerProps = {
  trace: MemoryTrace;
};

export function MemoryViewer({ trace }: MemoryViewerProps) {
  const [index, setIndex] = useState(0);
  const total = trace.snapshots.length;
  const snapshot = trace.snapshots[index];

  if (!snapshot) {
    return null;
  }

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        p: 2,
      }}
    >
      <Stack sx={{ gap: 1.5 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="caption" color="text.secondary">
            메모리 — 예제 시나리오{trace.scenario ? ` · ${trace.scenario}` : ''}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {index + 1} / {total} · line {snapshot.line}
          </Typography>
        </Stack>

        {total > 1 && (
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={goPrev}
              disabled={index === 0}
              startIcon={<ChevronLeftIcon />}
            >
              이전
            </Button>
            <Slider
              size="small"
              value={index}
              min={0}
              max={total - 1}
              step={1}
              marks
              onChange={(_, value) => setIndex(value as number)}
              sx={{ mx: 1 }}
            />
            <Button
              size="small"
              variant="outlined"
              onClick={goNext}
              disabled={index === total - 1}
              endIcon={<ChevronRightIcon />}
            >
              다음
            </Button>
          </Stack>
        )}

        {snapshot.caption && (
          <Typography variant="body2" color="text.secondary">
            {snapshot.caption}
          </Typography>
        )}

        <StackArea frames={snapshot.frames} />
      </Stack>
    </Box>
  );
}

type StackAreaProps = {
  frames: MemoryFrame[];
};

function StackArea({ frames }: StackAreaProps) {
  if (frames.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        활성 스택 프레임이 없습니다.
      </Typography>
    );
  }

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="caption" color="text.secondary">
        스택 (최신 프레임이 위)
      </Typography>
      <Stack sx={{ gap: 1 }}>
        {frames.map((frame, i) => (
          <FrameCard key={`${frame.name}-${i}`} frame={frame} />
        ))}
      </Stack>
    </Stack>
  );
}

type FrameCardProps = {
  frame: MemoryFrame;
};

function FrameCard({ frame }: FrameCardProps) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        p: 1.5,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontFamily: MONOSPACE_FONT_FAMILY, color: 'text.secondary' }}
      >
        frame: {frame.name}
      </Typography>
      {frame.vars.length === 0 ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          (변수 없음)
        </Typography>
      ) : (
        <Box
          sx={{
            mt: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1,
          }}
        >
          {frame.vars.map((v) => (
            <VarCell key={`${frame.name}-${v.name}`} variable={v} />
          ))}
        </Box>
      )}
    </Box>
  );
}

type VarCellProps = {
  variable: MemoryVar;
};

function VarCell({ variable }: VarCellProps) {
  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography variant="body2">
        {variable.name}{' '}
        <Box
          component="span"
          sx={{ color: 'text.secondary', fontFamily: MONOSPACE_FONT_FAMILY }}
        >
          : {variable.type}
        </Box>
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontFamily: MONOSPACE_FONT_FAMILY, mt: 0.5 }}
      >
        {variable.value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontFamily: MONOSPACE_FONT_FAMILY,
          color: 'text.secondary',
          display: 'block',
          mt: 0.5,
        }}
      >
        @ {variable.address}
      </Typography>
      {variable.note && (
        <Typography
          variant="caption"
          sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
        >
          {variable.note}
        </Typography>
      )}
    </Box>
  );
}

export type { MemorySnapshot };
