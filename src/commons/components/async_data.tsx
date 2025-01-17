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

  if (props.source.isLoading) {
    return props.onLoading
  }

  if (props.source.isError) {
    return <div>Error: {JSON.stringify(props.source.error)}</div>
  }
}
