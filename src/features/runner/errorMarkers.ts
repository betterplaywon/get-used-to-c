export type ParsedDiagnostic = {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'note';
  message: string;
};

const DIAGNOSTIC_PATTERN = /^[^:\n]+:(\d+):(\d+):\s*(error|warning|note|fatal error):\s*(.+)$/;

export function parseCompilerOutput(raw: string | null | undefined): ParsedDiagnostic[] {
  if (!raw) return [];

  const diagnostics: ParsedDiagnostic[] = [];
  for (const line of raw.split('\n')) {
    const match = line.match(DIAGNOSTIC_PATTERN);
    if (!match) continue;

    const [, lineStr, colStr, severityRaw, message] = match;
    const severity = severityRaw === 'fatal error' ? 'error' : (severityRaw as 'error' | 'warning' | 'note');

    diagnostics.push({
      line: Number(lineStr),
      column: Number(colStr),
      severity,
      message: message.trim(),
    });
  }
  return diagnostics;
}
