export type Permission = {
  id: number
  uid: string
  name: string
  description: string | null
  forAdmin: boolean
  createdAt: string
  updatedAt: string | null
}
