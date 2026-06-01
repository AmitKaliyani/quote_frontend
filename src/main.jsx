import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './routes/router.jsx'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './redux/store.js'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router} />
  <StrictMode>
    <Toaster position='top-right' />
  </StrictMode>
    </PersistGate>
  </Provider>
)
