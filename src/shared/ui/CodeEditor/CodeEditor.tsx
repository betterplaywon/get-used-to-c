import { useEffect, useRef } from 'react';
import { Editor, type Monaco, type OnMount } from '@monaco-editor/react';
import { Box, CircularProgress } from '@mui/material';
import type { editor } from 'monaco-editor';
import type { ParsedDiagnostic } from '@/shared/lib/errorMarkers';
import type { EditorLanguage } from '@/shared/types/code';
import { MONOSPACE_FONT_FAMILY } from '@/shared/config/theme';

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: EditorLanguage;
  height?: number | string;
  readOnly?: boolean;
  diagnostics?: ParsedDiagnostic[];
};

const MARKER_OWNER = 'get-used-to-c-runner';

export function CodeEditor({
  value,
  onChange,
  language = 'c',
  height = '100%',
  readOnly = false,
  diagnostics,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;
    monacoRef.current = monaco;

    monaco.editor.defineTheme('get-used-to-c', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#fafafa',
      },
    });
    monaco.editor.setTheme('get-used-to-c');
    editorInstance.updateOptions({
      tabSize: 4,
      insertSpaces: true,
    });
  };

  useEffect(() => {
    const editorInstance = editorRef.current;
    const monaco = monacoRef.current;
    if (!editorInstance || !monaco) return;

    const model = editorInstance.getModel();
    if (!model) return;

    const markers: editor.IMarkerData[] = (diagnostics ?? []).map((d) => ({
      startLineNumber: d.line,
      startColumn: d.column,
      endLineNumber: d.line,
      endColumn: d.column + 1,
      message: d.message,
      severity:
        d.severity === 'error'
          ? monaco.MarkerSeverity.Error
          : d.severity === 'warning'
            ? monaco.MarkerSeverity.Warning
            : monaco.MarkerSeverity.Info,
    }));

    monaco.editor.setModelMarkers(model, MARKER_OWNER, markers);
  }, [diagnostics]);

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
          fontFamily: MONOSPACE_FONT_FAMILY,
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
