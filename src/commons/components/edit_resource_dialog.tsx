import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/commons/components/ui/dialog'
import { PropsWithChildren, ReactNode } from 'react'
import { DialogResourceContext } from '@/commons/utils'

type Props<T> = DialogResourceContext<T> & {
  title: string
  description: string
  trigger?: ReactNode
}

export function EditResourceDialog<T>(props: PropsWithChildren<Props<T>>) {
  return (
    <Dialog open={!!props.resource} onOpenChange={props.close}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  )
}
