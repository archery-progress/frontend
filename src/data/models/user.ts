export type User = {
  id: number
  uid: string
  firstname: string
  lastname: string
  email: string
  status: UserStatus
  type: UserType
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}

export enum UserType {
  user = 'user',
  club = 'club',
  staff = 'staff',
}
