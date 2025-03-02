import { Navigate, Route, Routes } from 'react-router'
import AuthenticatedLayout from '@/commons/components/layouts/authenticated_layout'
import { useEffect } from 'react'
import { useGetAuthenticatedUserQuery } from '@/data/api/auth_api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/data/store/store'
import { getUserState, userActions, userSlice } from '@/data/store/user_store'
import { Skeleton } from '@/commons/components/ui/skeleton'
import AuthRouter from './pages/authentication/auth-router.tsx'
import ArcheryRouter from './pages/archery/archery-router.tsx'
import MemberRouter from '@/pages/member/member-router.tsx'
import { PagePlatformDashboardFeature } from '@/pages/platform/feature/page-platform_dashboard-feature.tsx'
import OnboardingRouter from '@/pages/onboarding/onboarding-router.tsx'
import ProfilRouter from '@/pages/profil/profil-router.tsx'
import StaffRouter from '@/pages/staff/staff-router.tsx'
import SupervisorsRouter from '@/pages/supervisors/supervisors-router.tsx'
import StructureMiddleware from './commons/components/middlewares/current-structure.middleware.tsx'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const {user, isLoading} = useSelector(getUserState)
  const {data, isError} = useGetAuthenticatedUserQuery()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!data) return

    dispatch(userSlice.actions.setUser({
      user: data,
      token
    }))
  }, [data])

  useEffect(() => {
    if (isError) dispatch(userActions.switchIsLoading(false))
  }, [isError])

  if (!user && isLoading) {
    return <Loading/>
  }

  return (
    <Routes>
      <Route path="authentication/*" element={<AuthRouter/>}/>
      <Route element={<AuthenticatedLayout/>}>
        <Route path="archery/*" element={<ArcheryRouter/>}/>
        <Route path="onboarding/*" element={<OnboardingRouter />}/>
        <Route path="profil/*" element={<ProfilRouter />}/>
      </Route>

      <Route path="structures/:structureId" element={<AuthenticatedLayout/>}>
        <Route element={<StructureMiddleware />}>
          <Route path="overview" element={<PagePlatformDashboardFeature/>}/>
          <Route path="members/*" element={<MemberRouter/>}/>
          <Route path="staff/*" element={<StaffRouter/>}/>
          <Route path="supervisors/*" element={<SupervisorsRouter/>}/>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/archery/dashboard" replace/>}/>
    </Routes>
  )
}

function Loading() {
  return <Skeleton className="w-12 h-4"/>
}
