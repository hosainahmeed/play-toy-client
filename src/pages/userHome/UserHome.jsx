import { useQuery } from '@tanstack/react-query'
import { FaCalendarAlt, FaShoppingCart, FaStar } from 'react-icons/fa'
import useAuth from '../../Components/Hook/useAuth'
import useAxiosSecure from '../../Components/Hook/useAxiosSecure'
import useCart from '../../Components/Hook/useCart'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UserHome = () => {
  const { user, loading } = useAuth()
  const { axiosSecure } = useAxiosSecure()
  const { cart } = useCart()
  const [reviewsData, setReviewsData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/reviews').then(res => {
      setReviewsData(res.data)
    })
  }, [])
  const { data: stats = {} } = useQuery({
    queryKey: ['user-stats'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/user-stats?email=${user?.email}`)
      return res.data
    }
  })
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`)
      return res.data
    }
  })

  return (
    <div className=' bg-gray-50'>
      <h1 className='text-3xl md:text-4xl font-bold text-center mt-8 text-black'>
        Hi {user?.displayName || 'User'}, Welcome Back!
      </h1>
      <div className='max-w-7xl mx-auto mt-10 px-4 md:px-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* User Profile Section */}
          <div className='flex-1 bg-black  flex items-center justify-center p-8 rounded-lg shadow-md'>
            <div className='text-center'>
              <img
                className='rounded-full w-36 h-36 md:w-48 md:h-48 border-4 border-white shadow-sm mx-auto'
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt='User Avatar'
              />
              <h3 className='text-xl md:text-2xl font-semibold mt-4 text-white'>
                {user?.displayName || 'Your Name'}
              </h3>
              <p className='text-sm md:text-lg text-white mt-2'>
                {user?.email || 'your.email@example.com'}
              </p>
            </div>
          </div>

          {/* Activities Section */}
          <div className='flex-1 bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl md:text-3xl font-semibold text-black'>
              Your Activities
            </h2>
            <div className='mt-6 space-y-4'>
              <div className='flex items-center gap-4'>
                <FaShoppingCart className='text-blue-500 text-xl' />
                <p className='text-gray-700 font-medium text-lg'>
                  Orders:{' '}
                  <span className='font-bold text-black'>
                    {cart.length || 0}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <FaStar className='text-green-500 text-xl' />
                <p className='text-gray-700 font-medium text-lg'>
                  Reviews:{' '}
                  <span className='font-bold text-black'>
                    {reviewsData.length || 0}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <FaCalendarAlt className='text-yellow-500 text-xl' />
                <p className='text-gray-700 font-medium text-lg'>
                  Till payment:{' '}
                  <span className='font-bold text-black'>
                    {payments.length || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome
