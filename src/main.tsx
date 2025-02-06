import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './data/store/store'
import LoginPage from './apps/authentication/pages/login_page'
import '@/commons/assets/css/app.css'
import AuthenticationLayout from '@/apps/authentication/components/layout'
import AuthenticatedLayout from '@/commons/components/layouts/authenticated_layout'
import { Toaster } from '@/commons/components/ui/sonner'
import { ArcheryDashboard } from '@/apps/archery/pages/archery_dashboard'
import { PlatformDashboard } from '@/apps/platform/pages/platform_dashboard'
import { MembersOverview } from '@/apps/platform/pages/members/members_overview.tsx'
import { SessionsOverview } from '@/apps/platform/pages/sessions/sessions_overview.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="authentication" element={<AuthenticationLayout/>}>
            <Route path="login" element={<LoginPage/>}/>
          </Route>
          <Route path="archery" element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<ArcheryDashboard/>}/>
          </Route>
          <Route path="structures/:structureId" element={<AuthenticatedLayout />}>
            <Route path="overview" element={<PlatformDashboard/>}/>
            <Route path="members">
              <Route path="overview" element={<MembersOverview/>} />
              <Route path=":memberId/view" element={<MembersOverview/>} />
            </Route>
            <Route path="sessions">
              <Route path="overview" element={<SessionsOverview/>} />
              <Route path=":sessionId/view" element={<SessionsOverview/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    <Toaster />
  </StrictMode>
)
