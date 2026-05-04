/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JUDGE0_URL?: string;
  readonly VITE_JUDGE0_HOST?: string;
  readonly VITE_JUDGE0_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
