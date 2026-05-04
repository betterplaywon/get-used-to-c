import { Editor, type OnMount } from '@monaco-editor/react';
import { Box, CircularProgress } from '@mui/material';

export type EditorLanguage = 'c' | 'cpp';

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: EditorLanguage;
  height?: number | string;
  readOnly?: boolean;
};

export function CodeEditor({
  value,
  onChange,
  language = 'c',
  height = '100%',
  readOnly = false,
}: CodeEditorProps) {
  const handleMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme('get-used-to-c', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#fafafa',
      },
    });
    monaco.editor.setTheme('get-used-to-c');
    editor.updateOptions({
      tabSize: 4,
      insertSpaces: true,
    });
  };

  return (
    <Box
      sx={{
        height,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Editor
        value={value}
        onChange={(v) => onChange(v ?? '')}
        language={language}
        onMount={handleMount}
        loading={<CircularProgress size={24} />}
        options={{
          fontSize: 14,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: 'line',
        }}
      />
    </Box>
  );
}
