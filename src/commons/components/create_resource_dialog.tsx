import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/commons/components/ui/dialog'
import { PropsWithChildren, ReactNode } from 'react'
import { DialogContext } from '@/commons/utils'

type Props = DialogContext & {
  title: string
  description: string
  trigger: ReactNode
}

export function CreateResourceDialog(props: PropsWithChildren<Props>) {
  return (
    <Dialog open={props.state} onOpenChange={props.setState}>
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
