import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { setupStore } from './data/store/store'
import '@/commons/assets/css/app.css'

import App from './app'

const container = document.getElementById('root') || document.createElement('div') as HTMLElement
const root = createRoot(container)

const store = setupStore()

const render = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

root.render(render)
