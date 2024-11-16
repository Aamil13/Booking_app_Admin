/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ISPRODUCTION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
