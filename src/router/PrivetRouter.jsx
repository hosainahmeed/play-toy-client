import { Navigate } from 'react-router-dom'
import useAuth from '../Components/Hook/useAuth'

function PrivetRouter ({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <p>...loading</p>
  }
  if (user) {
    return children
  }
  return <Navigate to={'login'} state={{}}></Navigate>
}

export default PrivetRouter
