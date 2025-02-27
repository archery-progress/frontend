import { ArrowLeft } from 'lucide-react'
import { Button } from '@/commons/components/ui/button'
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
      color="neutral"
      variant="surface"
      size="lg"
    >
      <div className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4"/>
        <span>Retour</span>
      </div>
    </Button>
  )
}
