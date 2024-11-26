import { Navigate } from 'react-router-dom'
import useAuth from '../Components/Hook/useAuth'
import Loader from '../Components/Loader/Loader'

function PrivetRouter ({ children }) {
  const { user,loading } = useAuth()
  if(loading){
    return <Loader></Loader>
  }
  if (user) {
    return children
  }
  return <Navigate to={'login'} state={{}}></Navigate>
}

export default PrivetRouter
