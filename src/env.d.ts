/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  REDMAIL_API_KEY: string;
  REDMAIL_TO: string;
  REDMAIL_CC?: string;
  REDMAIL_FROM: string;
  SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
