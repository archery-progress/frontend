import { useLoginMutation } from '@/data/api/auth_api'
import { Button } from '@/commons/components/ui/button'

export function LoginPage() {
  const [login] = useLoginMutation()

  return (
    <div>
      <Button onClick={() => login({
        email: 'string',
        password: 'string'
      })}>Login
      </Button>
      LoginPage
    </div>
  )
}
