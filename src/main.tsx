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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="authentication" element={<AuthenticationLayout/>}>
            <Route path="login" element={<LoginPage/>}/>
          </Route>
          <Route path="manager" element={<AuthenticatedLayout />}>
            <Route path="accounts">
              <Route path="users">
                <Route path="overview" element={<UsersOverview/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    <Toaster />
  </StrictMode>
)
