/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Third-party form endpoint that contact submissions are POSTed to. Optional
   * — without it the form falls back to the visitor's mail client. See
   * `src/lib/contact.ts`.
   */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
