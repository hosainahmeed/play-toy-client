import { useState } from 'react'
import { Menu, Button, Drawer } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { CiMenuBurger } from 'react-icons/ci'
import { IoIosLogOut, IoMdClose } from 'react-icons/io'
import useAuth from '../../Components/Hook/useAuth.jsx'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
import useCart from '../../Components/Hook/useCart.jsx'
import { useWishlist } from '../../Components/api/WishlistContext.jsx'

export default function Header () {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { user, logOut } = useAuth()
  const { cart } = useCart()
  const { wishList } = useWishlist()

  const navigate = useNavigate()

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shops', path: '/shop' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'History', path: '/history' }
  ]

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const handleLogOut = () => {
    logOut()
  }

  return (
    <div className='navbar-container'>
      {/* Mobile Menu Toggle */}
      <div className='flex justify-between items-center bg-white px-2'>
        <Button
          className='menu-toggle-btn sm:hidden'
          onClick={toggleDrawer}
          icon={isDrawerOpen ? <IoMdClose /> : <CiMenuBurger />}
        />

        {/* Navbar Brand */}
        <div
          onClick={() => navigate('/')}
          className='navbar-brand flex items-end gap-2 pr-3 md:px-12 py-4'
        >
          <img
            src='https://cdn-icons-png.freepik.com/256/11835/11835521.png?semt=ais_hybrid'
            alt='play Logo'
            className='w-12'
          />
          <h1 className='font-ranch text-sm md:text-xl font-bold'>
            Play <span className='text-cyan-500'>Toy</span>
          </h1>
        </div>

        {/* Main Menu for Larger Screens */}
        <Menu mode='horizontal' className='hidden sm:flex'>
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>

        {/* Right Side Login and Signup */}
        <div className='flex gap-4 items-center justify-end'>
          <div className='indicator'>
            <span className='indicator-item badge badge-secondary'>{wishList.length}</span>
            <div className='p-2'>
              <Link to={'wishList'}>
                <FaHeart className='hover:scale-125 transition-all' />
              </Link>
            </div>
          </div>
          <div className='indicator'>
            <span className='indicator-item badge badge-secondary'>
              {cart.length}
            </span>
            <div className='p-2'>
              <Link to={'cart'}>
                <FaCartPlus className='hover:scale-125 transition-all' />
              </Link>
            </div>
          </div>
          {user ? (
            <div className='flex items-center gap-2'>
              <div>
                <div className='w-12 h-12 rounded-full border-2 p-2'>
                  <img src={user?.photoURL} alt='' />
                </div>
              </div>
              <button onClick={handleLogOut} className='hidden lg:block'>
                <IoIosLogOut style={{ fontSize: '24px' }} />
              </button>
            </div>
          ) : (
            <Button className='border-b-2 border-0 rounded-none' href='/login'>
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <Drawer
        title='Menu'
        placement='left'
        onClose={toggleDrawer}
        visible={isDrawerOpen}
        className='sm:hidden'
      >
        <Menu mode='vertical'>
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className='flex items-center justify-center gap-2 h-12'>
          <Link to={'wishList'}>
            <Button>
              <FaHeart />
            </Button>
          </Link>
          <Link to={'cart'}>
            <Button>
              <FaCartPlus />
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  )
}
