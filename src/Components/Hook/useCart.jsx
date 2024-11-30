import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
const useCart = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const {
    data: cart = [],
    isLoading,
    refetch: refetchCart
  } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/cart/${user?.email}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch cart:', error)
        throw new Error('Unable to fetch cart data')
      }
    }
  })

  return { cart, isLoading, refetchCart }
}

export default useCart
