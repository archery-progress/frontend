export type GetSessionsRequest = {
  structureId?: string
  queryParams: string
}

export type GetSessionRequest = {
  structureId?: string
  sessionId?: string
}

export type StoreSessionRequest = {
  structureId?: string
}


export type MutateSessionRequest = {
  structureId?: string
  sessionId?: string
  data: unknown
}

export type MutateSessionParticipantRequest = {
  structureId?: string
  sessionId?: string
  memberId: unknown
}
