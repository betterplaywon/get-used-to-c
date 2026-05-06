import { Stack, Typography } from '@mui/material';

type StepBodyProps = {
  paragraphs: string[];
};

export function StepBody({ paragraphs }: StepBodyProps) {
  return (
    <Stack sx={{ gap: 1.5 }}>
      {paragraphs.map((p, i) => (
        <Typography key={i} sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {renderInline(p)}
        </Typography>
      ))}
    </Stack>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <Typography
          key={i}
          component="code"
          sx={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            fontSize: '0.95em',
            backgroundColor: 'grey.50',
            border: 1,
            borderColor: 'divider',
            borderRadius: 0.5,
            px: 0.75,
            py: 0.25,
          }}
        >
          {part.slice(1, -1)}
        </Typography>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Typography key={i} component="strong" sx={{ fontWeight: 700 }}>
          {part.slice(2, -2)}
        </Typography>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
