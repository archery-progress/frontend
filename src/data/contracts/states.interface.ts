import { Structure } from "../models/structure";
import { User } from "../models/user";

export interface UserState {
  isLoading: boolean,
  user: User | null,
  token: string | null
}

export interface StructureState {
  structures: Structure[] | null
}