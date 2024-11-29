import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'
import { FaEyeLowVision, FaGoogle } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../Components/Hook/useAuth'
import Swal from 'sweetalert2'
import axios from 'axios'
const Register = () => {
  const [showpass, setShowpass] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { createUser, googleSignIn,user } = useAuth()
  const navigate = useNavigate()
  const onSubmit = async data => {
    const { email, password, displayName, photoURL } = data
    const userData = { displayName, email, photoURL }

    try {
      await axios.post('http://localhost:5000/users', userData)
      const result = await createUser(email, password)
      console.log(result)
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have been successfully registered!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate('/login')
      })

      reset()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'An error occurred during registration.',
        confirmButtonText: 'Try Again'
      })
    }
  }
  
  const handleGoogleRegister = async () => {
    try {
      await googleSignIn().then(() => {
        const displayName = user?.displayName || 'Anonymous User'
        const email = user?.email
        const photoURL = user?.photoURL || 'default-photo-url'
        const userData = { displayName, email, photoURL }

        axios.post('http://localhost:5000/users', userData)
        Swal.fire({
          icon: 'success',
          title: 'Google Sign-In Successful',
          text: 'You have been signed in successfully!',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          navigate('/login')
        })
      })
    } catch (error) {
      if (error.response) {
        // Handle server-side error
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text:
            error.response.data.message ||
            'An error occurred while saving your data.',
          confirmButtonText: 'Try Again'
        })
      } else {
        // Handle client-side or unknown error
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message || 'An error occurred during Google sign-in.',
          confirmButtonText: 'Try Again'
        })
      }
    }
  }

  return (
    <div className=' md: flex flex-col md:flex-row min-h-screen  items-center justify-center gap-2 mx-4'>
      <div className='bg-[#13232f]/90 p-10  rounded-lg shadow-lg'>
        <div>
          <h1 className='text-center text-white font-light text-3xl mb-4'>
            Sign Up for Free
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex space-x-4 mb-4'>
              <div className='relative w-full'>
                <label className='text-white/50 text-lg'>Name</label>
                <input
                  placeholder=''
                  type='text'
                  {...register('displayName', {
                    message: 'Invalid name',
                    required: 'Name is required'
                  })}
                  className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-cyan-500'
                  autoComplete='given-name'
                />
                {errors.displayName && (
                  <p className='text-cyan-500 text-sm'>
                    {errors.displayName.message}
                  </p>
                )}
              </div>
            </div>
            <div className='flex space-x-4 mb-4'>
              <div className='relative w-full'>
                <label className='text-white/50 text-lg'>image URL</label>
                <input
                  placeholder=''
                  type='text'
                  {...register('photoURL', {
                    message: 'Invalid name  ',
                    required: 'Image URL required'
                  })}
                  className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-cyan-500'
                  autoComplete='given-name'
                />
                {errors.photoURL && (
                  <p className='text-cyan-500 text-sm'>
                    {errors.photoURL.message}
                  </p>
                )}
              </div>
            </div>

            <div className='relative mb-4'>
              <label className='text-white/50 text-lg'>Email Address</label>
              <input
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-cyan-500'
                autoComplete='email'
              />
              {errors.email && (
                <p className='text-cyan-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div className='relative mb-4'>
              <label className='text-white/50 text-lg'>Set A Password</label>
              <div className='flex items-center justify-between gap-2 border border-gray-400 pr-2'>
                <input
                  type={showpass ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 5,
                      message: 'Password must be at least 5 characters'
                    }
                  })}
                  className='text-xl w-full p-2 bg-transparent text-white focus:outline-none focus:border-cyan-500'
                  autoComplete='new-password'
                />
                <h1 onClick={() => setShowpass(p => !p)}>
                  {showpass ? (
                    <FaEyeLowVision className='text-cyan-500 text-xl'></FaEyeLowVision>
                  ) : (
                    <FaEye className='text-cyan-400 text-xl'></FaEye>
                  )}
                </h1>
              </div>
              {errors.password && (
                <p className='text-cyan-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='w-full bg-cyan-500 text-white p-4 text-2xl font-bold hover:bg-cyan-500 transition-all'
            >
              Get Started
            </button>
          </form>
        </div>
        <div className='flex items-center gap-2 justify-center mt-2 text-white underline hover:text-cyan-500 cursor-pointer'>
          <FaGoogle></FaGoogle>{' '}
          <span onClick={handleGoogleRegister}>Resgister with Google</span>
        </div>
        <h1 className='text-white text-sm md:text-base mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-cyan-500 hover:underline'>
            Go to login
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default Register
