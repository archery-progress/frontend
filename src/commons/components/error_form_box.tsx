import { Alert, AlertDescription, AlertTitle } from '@/commons/components/ui/alert.tsx'
import { AlertCircle } from 'lucide-react'

type Props = {
  error: {
    data: {
      message: string
      name: string
      status: number
    }
  }
}

export function ErrorFormBox(props: Props) {
  return (
    <Alert variant="destructive" className="-mt-3">
      <AlertCircle className="h-4 w-4 !text-destructive" />
      <AlertTitle>{props.error.data.status} - {props.error.data.name}</AlertTitle>
      <AlertDescription>{props.error.data.message}</AlertDescription>
    </Alert>
  )
}
