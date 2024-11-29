import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useAdmin = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !!user.email,
    queryFn: async () => {
      console.log('asking or checking is admin', user)
      const res = await axiosSecure.get(`/users/admin/${user.email}`)
      return res.data?.admin
    }
  })
  console.log(isAdmin)

  return [isAdmin, isAdminLoading]
}

export default useAdmin
