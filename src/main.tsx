import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import ManagerLayout from './apps/manager/commons/components/layout.tsx'
import { UsersOverview } from './apps/manager/users/pages/users_overview.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import AuthenticationLayout from './apps/authentication/commons/components/layout'
import { LoginPage } from './apps/authentication/pages/login_page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="authentication" element={<AuthenticationLayout/>}>
            <Route path="login" element={<LoginPage/>}/>
          </Route>
          <Route path="manager" element={<ManagerLayout/>}>
            <Route path="accounts">
              <Route path="users">
                <Route path="overview" element={<UsersOverview/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
