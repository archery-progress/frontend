import { Outlet, useNavigate } from 'react-router'
import { useGetAuthenticatedUserQuery } from '@/data/api/auth_api.ts'
import { useEffect } from 'react'
import { usePermissionBitwise } from '@/commons/utils'

export default function ManagerLayout() {
  const navigate = useNavigate()
  const { has } = usePermissionBitwise()
  const {data: user} = useGetAuthenticatedUserQuery()

  useEffect(() => {
    if (!user?.permissions || !has(user?.permissions, 'INTERNAL_MANAGER')) {
      navigate('/authentication/login')
      return
    }
  }, [user])

  return (
    <div>
      <Outlet />
    </div>
  )
}


