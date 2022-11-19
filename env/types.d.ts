type Env = Partial<Readonly<typeof import('./env.local.json')>>

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly NEXT_PUBLIC_APP_ENV?: string
    readonly GOOGLE_ID: string
    readonly GOOGLE_SECRET: string
  }
}
