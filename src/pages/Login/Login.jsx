import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaGoogle } from 'react-icons/fa'
import { FaEyeLowVision } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../Components/Hook/useAuth'
import Swal from 'sweetalert2'
// import loginImage from "../../../src/assets/images/login/login.svg";
function Login () {
  const [showpass, setShowpass] = useState(false)
  const { loginUser, googleSignIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  const handleGoogleLogin = async () => {
    try {
      const user = await googleSignIn()
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome, ${user.displayName || 'User'}!`,
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        const redirectTo = location.state?.from?.pathname || '/'
        navigate(redirectTo, { replace: true })
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong!'
      }).then(() => {
        reset()
      })
      console.error('Error during Google Sign-In:', error)
    }
  }
  return (
    <div className=' md: flex flex-col-reverse md:flex-row min-h-screen  items-center justify-center gap-12 mx-4'>
      {/* <img className="w-72 md:w-96" src={loginImage} /> */}
      <div className='bg-[#13232f]/90 p-10 rounded-lg shadow-lg'>
        <h1 className='text-center text-white font-light text-3xl mb-10'>
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative mb-10'>
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

          <div className='relative mb-10'>
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
                  <FaEye className='text-cyan-500 text-xl'></FaEye>
                )}
              </h1>
            </div>
            {errors.password && (
              <p className='text-cyan-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          <p className='text-right text-white mb-4'>
            <a href='#' className='hover:text-cyan-500'>
              Forgot Password?
            </a>
          </p>

          <button
            type='submit'
            className='w-full bg-cyan-500 text-white p-4 text-2xl font-bold hover:bg-cyan-400 transition-all'
          >
            Log In
          </button>
        </form>
        <div className='flex items-center gap-2 justify-center mt-2 text-white underline hover:text-cyan-500 cursor-pointer'>
          <FaGoogle></FaGoogle>{' '}
          <span onClick={handleGoogleLogin}>Resgister with Google</span>
        </div>
        <h1 className='text-white mt-6'>
          Dont have an account?
          <Link
            to='/register'
            className='text-cyan-500 text-sm md:text-base hover:underline ml-2'
          >
            Go to Sign up
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default Login
