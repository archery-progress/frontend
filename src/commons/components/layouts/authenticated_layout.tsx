import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userSlice } from '@/data/store/user_store.ts'
import { Outlet, useNavigate } from 'react-router'

export default function AuthenticatedLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    const token = sessionStorage.getItem('token')

    if (!token) {
      navigate('/authentication/login')
    }

    dispatch(userSlice.actions.setUser({
      user: user ? JSON.parse(user) : null,
      token
    }))

    const intervalId = setInterval(() => {
      const token = sessionStorage.getItem('token')
      if (!token) {
        navigate('/authentication/login')
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [dispatch, navigate])


  return <Outlet/>
}
