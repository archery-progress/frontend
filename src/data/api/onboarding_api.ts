import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'
import { Structure } from '../models/structure'

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery,
  endpoints: (builder) => ({
    createStructure: builder.mutation<Structure, CreateStructureFormSchema>({
      query: (payload) => ({
        url: `/v1/structures`,
        method: 'POST',
        body: payload
      })
    })
  })
})

export const { useCreateStructureMutation } = onboardingApi
