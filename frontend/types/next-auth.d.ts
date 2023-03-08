import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string
    }
    accessToken: JWT
  }
}

// interface Session {
//   user: User | JWT
//   accessToken: JWT
// }

// interface User extends DefaultUser {
//   id?: string | null
// }
