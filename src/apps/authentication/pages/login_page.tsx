import { useLoginMutation } from '@/data/api/auth_api'

export function LoginPage() {
  const [login] = useLoginMutation()

  return (
    <div>
      <button onClick={() => login({
        email: 'string',
        password: 'string'
      })}>Login
      </button>
      LoginPage
    </div>
  )
}
