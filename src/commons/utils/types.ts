import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit'

export type QueryError = FetchBaseQueryError | SerializedError | undefined

export type State<T> = [T, Dispatch<SetStateAction<T>>]

export type Paginated<T> = {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
  }
}

export type ZodSchema<T extends z.ZodType<never, never, never>> = z.infer<T>

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type SnakeToCamelCaseObject<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K]
}
