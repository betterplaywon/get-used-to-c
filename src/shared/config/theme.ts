import { createTheme } from '@mui/material/styles';

export const MONOSPACE_FONT_FAMILY = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Noto Sans KR"',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.25rem', fontWeight: 600 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.375rem', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});
