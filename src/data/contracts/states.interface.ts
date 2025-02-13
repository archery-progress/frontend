import { User } from "../models/user";

export interface UserState {
  isLoading: boolean,
  user: User | null,
  token: string | null
}