import { User } from '@/data/models/user.ts'

export type AuthLoginRequest = {
  email: string
  password: string
}

export type AuthLoginResponseRequest = {
  user: User
  token: string
}
