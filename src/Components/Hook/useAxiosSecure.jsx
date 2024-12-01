import axios from 'axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

const axiosSecure = axios.create({
  baseURL: 'https://playtoy-server.vercel.app',
  withCredentials: true
})

const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleUnauthorizedError = error => {
    if (error.response) {
      const { status } = error.response
      if (status === 401 || status === 403) {
        console.log('User is unauthorized, logging out...')
        logOut()
          .then(() => navigate('/login'))
          .catch(err => console.error('Logout error:', err))
      }
    } else {
      console.error('Unexpected error:', error)
    }
  }

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => {
        handleUnauthorizedError(error)
        return Promise.reject(error)
      }
    )

    return () => axiosSecure.interceptors.response.eject(interceptor)
  }, [logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure
