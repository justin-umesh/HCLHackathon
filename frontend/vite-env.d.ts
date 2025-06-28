/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_END_POINT: string;
  // Add more env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
