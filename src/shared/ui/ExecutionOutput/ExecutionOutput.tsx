import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { MONOSPACE_FONT_FAMILY } from '@/shared/config/theme';

export type ExecutionStatus = 'idle' | 'running' | 'done' | 'error';

type ExecutionOutputProps = {
  status: ExecutionStatus;
  output: string;
  errorMessage: string | null;
  dense?: boolean;
};

export function ExecutionOutput({
  status,
  output,
  errorMessage,
  dense = false,
}: ExecutionOutputProps) {
  const sizing = dense
    ? { p: 1.5, minHeight: 96, maxHeight: 220 }
    : { p: 2, flex: 1, minHeight: 0 };
  const spinnerSize = dense ? 16 : 20;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'grey.50',
        fontFamily: MONOSPACE_FONT_FAMILY,
        fontSize: 14,
        whiteSpace: 'pre-wrap',
        overflow: 'auto',
        ...sizing,
      }}
    >
      <ExecutionOutputBody
        status={status}
        output={output}
        errorMessage={errorMessage}
        spinnerSize={spinnerSize}
      />
    </Box>
  );
}

type BodyProps = ExecutionOutputProps & { spinnerSize: number };

function ExecutionOutputBody({ status, output, errorMessage, spinnerSize }: BodyProps) {
  if (status === 'running') {
    return (
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={spinnerSize} />
        <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
          실행 중...
        </Typography>
      </Stack>
    );
  }
  if (status === 'error') {
    return (
      <Box sx={{ color: 'error.main', fontFamily: 'inherit', fontSize: 'inherit' }}>
        {errorMessage ?? '알 수 없는 오류가 발생했습니다.'}
      </Box>
    );
  }
  if (status === 'idle' && !output) {
    return (
      <Typography color="text.secondary" sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
        실행 버튼을 눌러 결과를 확인하세요.
      </Typography>
    );
  }
  return <>{output}</>;
}
