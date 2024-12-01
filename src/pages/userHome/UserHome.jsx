import { useQuery } from '@tanstack/react-query'
import { FaCalendarAlt, FaShoppingCart, FaStar } from 'react-icons/fa'
import useAuth from '../../Components/Hook/useAuth'
import useAxiosSecure from '../../Components/Hook/useAxiosSecure'
import useCart from '../../Components/Hook/useCart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { Tooltip } from 'antd'

const COLORS = ['#7F56D9', '#2DD4BF', '#FACC15', '#FB7185']

const UserHome = () => {
  const { user } = useAuth()
  const { axiosSecure } = useAxiosSecure()
  const { cart, isLoading } = useCart()
  const [reviewsData, setReviewsData] = useState([])

  useEffect(() => {
    axios.get('https://playtoy-server.vercel.app/reviews').then(res => {
      setReviewsData(res.data)
    })
  }, [])

  const { data: payments = [], isLoading: paymentLoading } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`)
      return res.data
    }
  })
  if (isLoading || paymentLoading) {
    return <p>..loading</p>
  }
  const chartData = [
    { name: 'Orders', value: cart.length || 0 },
    { name: 'Reviews', value: reviewsData.length || 0 },
    { name: 'Payments', value: payments.length || 0 }
  ]

  return (
    <div className='bg-gradient-to-r from-purple-600 via-black to-purple-600 p-2 md:p-6'>
      <h1 className='text-2xl md:text-4xl font-extrabold text-center mt-8 text-white'>
        Hi {user?.displayName || 'User'}, Welcome Back!
      </h1>
      <div className='mt-8 md:mt-12 md:px-8 space-y-10'>
        {/* User Profile Section */}
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex-1 p-6 flex items-center justify-center'>
            <div className='text-center'>
              <img
                className='rounded-full w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 border-4 border-white shadow-md mx-auto'
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt='User Avatar'
              />
              <h3 className='text-lg sm:text-xl md:text-2xl font-bold mt-4 text-white'>
                {user?.displayName || 'Your Name'}
              </h3>
              <p className='text-xs sm:text-base md:text-lg text-gray-200 mt-2'>
                {user?.email || 'your.email@example.com'}
              </p>
            </div>
          </div>

          {/* Activities Section */}
          <div className='flex-1 p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
              Your Activities
            </h2>
            <div className='mt-6 space-y-4'>
              <div className='flex items-center gap-4'>
                <FaShoppingCart className='text-blue-300 text-xl sm:text-2xl' />
                <p className='text-sm sm:text-lg text-gray-200'>
                  Orders:{' '}
                  <span className='font-bold text-white'>
                    {cart.length || 0}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <FaStar className='text-green-300 text-xl sm:text-2xl' />
                <p className='text-sm sm:text-lg text-gray-200'>
                  Reviews:{' '}
                  <span className='font-bold text-white'>
                    {reviewsData.length || 0}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <FaCalendarAlt className='text-yellow-300 text-xl sm:text-2xl' />
                <p className='text-sm sm:text-lg text-gray-200'>
                  Payments:{' '}
                  <span className='font-bold text-white'>
                    {payments.length || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className='p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4'>
            Your Activities Chart
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
              <XAxis dataKey='name' stroke='#fff' />
              <YAxis stroke='#fff' />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#333',
                  border: 'none',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey='value' fill='#7F56D9' barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default UserHome
