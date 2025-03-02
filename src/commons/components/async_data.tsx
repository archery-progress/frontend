import { ReactNode } from 'react'

type Props<T, E> = {
  data?: T
  isLoading: boolean
  error?: E
  onData?: (data: T) => ReactNode
  onError?: (error: never) => ReactNode
  onLoading?: ReactNode
}

export function AsyncData<T, E>(props: Props<T, E>) {
  if (props.onData && props.data) {
    return props.onData(props.data)
  }

  if (props.onLoading && props.isLoading) {
    return props.onLoading
  }

  if (props.onError && (props.error || props.data == undefined || typeof (props.data as unknown) === 'string')) {
    return props.onError(props.data as never)
  }
}
