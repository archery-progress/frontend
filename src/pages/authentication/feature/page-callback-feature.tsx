import Loader from "@/commons/components/loader"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function PageCallbackFeature() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      sessionStorage.setItem('token', token)

      navigate('/archery/dashboard', {
        replace: true
      })
    }
  }, [navigate])

  return <Loader />
}