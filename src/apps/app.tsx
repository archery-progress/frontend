import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import AuthenticatedLayout from "@/commons/components/layouts/authenticated_layout";
import { PlatformDashboard } from "./platform/pages/platform_dashboard";
import { MembersOverview } from "./platform/pages/members/members_overview";
import { useEffect } from "react";
import { useGetAuthenticatedUserQuery } from "@/data/api/auth_api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/data/store/store";
import { getUserState, userActions, userSlice } from "@/data/store/user_store";
import { Skeleton } from "@/commons/components/ui/skeleton";
import PageAuth from "./pages/authentication/page-auth";
import PageArchery from "./pages/archery/page-archery";

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isLoading } = useSelector(getUserState)
  const { data, isError } = useGetAuthenticatedUserQuery()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (!data) return

    if (!token) {
      navigate('/authentication/login')
    }

    dispatch(userSlice.actions.setUser({
      user: data,
      token
    }))  
  }, [data])


  useEffect(() => {
    if (isError) {
      dispatch(userActions.switchIsLoading(false))
    }
  }, [isError])

  useEffect(() => {
    if (!user && !isLoading && !pathname.includes('authentication/login')) {
      navigate('/authentication/login')
    }
  }, [user, isLoading])


  if (!user && isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div>
       <Routes>
          <Route path="authentication/*" element={<PageAuth />} />
          <Route element={<AuthenticatedLayout />}>
            <Route path="archery/*" element={<PageArchery />} />  
          </Route>
          
          <Route path="structures/:structureId" element={<AuthenticatedLayout />}>
            <Route path="overview" element={<PlatformDashboard/>}/>
            <Route path="members/overview" element={<MembersOverview/>} />
            <Route path="members/:memberId/view" element={<MembersOverview/>} />
          </Route>

          <Route path='*' element={<Navigate to="/archery/dashboard" replace />} />
        </Routes>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <Skeleton className="w-12 h-4" />
    </div>
  )
}