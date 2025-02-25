import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Member } from '@/data/models/user.ts'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery,
  endpoints: (builder) => ({
    createStructure: builder.mutation<Member, CreateStructureFormSchema>({
      query: (payload) => ({
        url: `/v1/structures`,
        method: 'POST',
        body: payload
      })
    })
  })
})

export const {} = onboardingApi
