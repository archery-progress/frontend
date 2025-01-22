import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { UsersOverview } from './apps/manager/users/pages/users_overview.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import LoginPage from './apps/authentication/pages/login_page'
import '@/commons/assets/css/app.css'
import AuthenticationLayout from '@/apps/authentication/components/layout.tsx'
import AuthenticatedLayout from '@/commons/components/layouts/authenticated_layout.tsx'
import { Toaster } from '@/commons/components/ui/sonner.tsx'
import { ArcheryDashboard } from '@/apps/archery/pages/archery_dashboard.tsx'
import { PlatformDashboard } from '@/apps/platform/pages/platform_dashboard.tsx'

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
          <Route path="platform" element={<AuthenticatedLayout />}>
            <Route path=":structureId">
              <Route path="overview" element={<PlatformDashboard/>}/>
            </Route>
          </Route>
          <Route path="manager" element={<AuthenticatedLayout />}>
            <Route path="users">
              <Route path="overview" element={<UsersOverview/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    <Toaster />
  </StrictMode>
)
