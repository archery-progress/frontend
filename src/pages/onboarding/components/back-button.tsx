import { ArrowLeft } from 'lucide-react'
import { Button } from '@/commons/components/ui/button.tsx'
import { useNavigate } from 'react-router'
import { MouseEvent } from 'react'

export default function BackButton() {
  const navigate = useNavigate()

  function back(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <Button
      onClick={back}
      variant="secondary"
      size="sm"
    >
      <ArrowLeft className="w-6 h-6"/>
      Retour
    </Button>
  )
}
