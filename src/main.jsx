import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router/router'
import AuthProvider from './Components/provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WishlistProvider } from './Components/api/WishlistContext'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <WishlistProvider>
          <RouterProvider router={router}></RouterProvider>
        </WishlistProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
