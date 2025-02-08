import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { Member, User } from '@/data/models/user.ts'
import {
  GetSessionRequest,
  GetSessionsRequest, MutateSessionParticipantRequest,
  MutateSessionRequest,
  StoreSessionRequest
} from '@/data/contracts/session.ts'

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery,
  tagTypes: ['sessions', 'session'],
  endpoints: (builder) => ({
    paginateSessions: builder.query<Paginated<Member>, GetSessionsRequest>({
      providesTags: ['sessions'],
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions?${payload.queryParams}`,
        method: 'GET'
      })
    }),
    getSession: builder.query<User, GetSessionRequest>({
      providesTags: ['session'],
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions/${payload.sessionId}`,
        method: 'GET'
      })
    }),
    storeSession: builder.mutation<Member, StoreSessionRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions`,
        method: 'POST'
      }),
      invalidatesTags: ['sessions']
    }),
    updateSession: builder.mutation<Member, MutateSessionRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions/${payload.sessionId}`,
        method: 'PUT',
        body: payload.data
      }),
      invalidatesTags: ['sessions', 'session']
    }),
    addParticipant: builder.mutation<Member, MutateSessionParticipantRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions/${payload.sessionId}/participants/${payload.memberId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['sessions', 'session']
    }),
    removeParticipant: builder.mutation<Member, MutateSessionParticipantRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/sessions/${payload.sessionId}/participants/${payload.memberId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['sessions', 'session']
    })
  })
})

export const {
  usePaginateSessionsQuery,
  useGetSessionQuery,
  useStoreSessionMutation,
  useUpdateSessionMutation,
  useAddParticipantMutation,
  useRemoveParticipantMutation
} = sessionApi
