import { useLoginMutation } from "@/data/api/auth_api"
import { AppDispatch } from "@/data/store/store"
import { userActions } from "@/data/store/user_store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { toastVariant } from '@/commons/utils'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PageLogin from "../ui/page-login"
import { LoginFormSchema, loginValidator } from "../validators/login_validator"

export default function PageLoginFeature() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [handleLogin, result] = useLoginMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(userActions.setUser(result.data))

      sessionStorage.setItem('token', result.data.token)
      navigate('/archery/dashboard')

      toast.success('Success', {
        ...toastVariant.success,
        description: 'Vous êtes maintenant connecté.',
      })
    }

    if (result.isError) {
      toast.error('Error', {
        ...toastVariant.error,
        description: 'Une erreur est survenue lors de la connexion.',
      })
    }
  }, [result])

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    handleLogin(data)
  })

  return (
    <PageLogin 
      form={form}
      handleLogin={handleSubmit}
    />
  )
}