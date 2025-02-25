import { Button } from '@/commons/components/ui/button.tsx'
import { MouseEvent } from 'react'

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  label?: string
}

export default function NextButton(props: Props) {
  return (
    <Button
      onClick={props.onClick}
      variant="default"
      disabled={props.disabled}
      size="sm"
    >
      {props.label ?? 'Suivant'}
    </Button>
  )
}
