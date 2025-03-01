import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { Member } from '@/data/models/user.ts'
import {
  GetMemberRequest,
  GetMembersRequest,
  MutateMemberRequest,
  MutateRoleMemberRequest,
} from '@/data/contracts/member.ts'

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery,
  tagTypes: ['members', 'member'],
  endpoints: (builder) => ({
    PaginateMembers: builder.query<Paginated<Member>, GetMembersRequest>({
      providesTags: ['members'],
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/members?${payload.queryParams}`,
        method: 'GET',
      }),
    }),
    getMember: builder.query<Member, GetMemberRequest>({
      providesTags: ['member'],
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/members/${payload.memberId}`,
        method: 'GET',
      }),
    }),
    addMemberRole: builder.mutation<Member, MutateRoleMemberRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/members/${payload.userId}/roles/${payload.roleId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['members', 'member'],
    }),
    removeMemberRole: builder.mutation<Member, MutateRoleMemberRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/members/${payload.userId}/roles/${payload.roleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['members', 'member'],
    }),
    updateMember: builder.mutation<Member, MutateMemberRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/members/${payload.memberId}`,
        method: 'PUT',
        body: payload.data,
      }),
      invalidatesTags: ['members', 'member'],
    }),
  }),
})

export const {
  usePaginateMembersQuery,
  useGetMemberQuery,
  useAddMemberRoleMutation,
  useRemoveMemberRoleMutation,
  useUpdateMemberMutation,
} = memberApi
