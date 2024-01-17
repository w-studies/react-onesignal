/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DOTENV: string
  readonly VITE_ONESIGNAL_APPID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
