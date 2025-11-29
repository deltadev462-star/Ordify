/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Application Environment
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  
  // API Configuration
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  
  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG_MODE: string
  
  // External Services
  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_SENTRY_DSN?: string
  
  // Development Settings
  readonly VITE_DEV_PORT: string
  
  // Built-in Vite variables
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}