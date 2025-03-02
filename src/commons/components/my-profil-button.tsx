import { useNavigate } from 'react-router'
import { User2Icon } from 'lucide-react'
import { Button } from '@/commons/components/ui/button-old.tsx'

export default function MyProfilButton() {
  const navigate = useNavigate()

  return (
    <Button variant="outline" onClick={() => navigate('/profil/general')}>
      <User2Icon className="mr-2"/>
      Mon compte
    </Button>
  )
}
