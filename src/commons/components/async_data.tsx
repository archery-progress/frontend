import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { ReactNode } from 'react'

type Props<T> = {
  source: TypedUseQueryHookResult<T, void, any, any>
  onData: (data: T) => ReactNode
  onError?: (error: never) => ReactNode
  onLoading?: ReactNode
}

export function AsyncData<T>(props: Props<T>) {
  if (props.source.isSuccess) {
    return props.onData(props.source.data)
  }

  if (props.onLoading && props.source.isLoading) {
    return props.onLoading
  }

  if (props.onError && props.source.isError) {
    return props.onError(props.source.error as never)
  }
}
