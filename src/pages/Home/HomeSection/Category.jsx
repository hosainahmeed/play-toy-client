import { useEffect, useState } from 'react'
import { Modal, Popover, Pagination, Slider, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import {
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined
} from '@ant-design/icons'
import { IoCloseCircle } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import useAuth from '../../../Components/Hook/useAuth'
import { useWishlist } from '../../../Components/api/WishlistContext'
import useCart from '../../../Components/Hook/useCart'

function Category () {
  const [toysData, setToysData] = useState([])
  const [uniqueCategories, setUniqueCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedToy, setSelectedToy] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isTapped, setIsTapped] = useState(false)
  const { user } = useAuth()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [priceRange, setPriceRange] = useState([0, 100])
  const { refetch } = useWishlist()
  const {refetchCart} = useCart()

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('https://playtoy-server.vercel.app/products').then(res => {
      setToysData(res.data)
      const categories = [...new Set(res.data.map(toy => toy.category))]
      setUniqueCategories(categories)

      if (categories.length > 0) setSelectedCategory('')
    })
  }, [])

  const handleQuickView = toy => {
    setSelectedToy(toy)
    setQuantity(1)
    setIsModalVisible(true)
  }
  //adtoCard
  const handleAddToCart = (toy, quantity) => {
    if (!user || !user.email) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.'
      })
      return
    }
    const cartItem = {
      userId: user.email,
      toyId: toy._id,
      name: toy.name,
      image: toy.image,
      price: toy.price,
      category: toy.category,
      quantity
    }

    axios
      .post(`https://playtoy-server.vercel.app/cart`, cartItem)
      .then(result => {
        refetchCart()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added to cart!',
          timer: 3000,
          timerProgressBar: true
        })
        setIsModalVisible(false)
      })
      .catch(error => {
        console.error('Error adding to cart:', error)
        Swal.fire({
          icon: 'error',
          title: 'Add Failed',
          text: 'This items already in your cart if you need then remove or by from cart then tryu again!'
        })
      })
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handlePriceChange = value => {
    setPriceRange(value)
    setCurrentPage(1)
  }

  const filteredToys = toysData.filter(toy => {
    const isCategoryMatch = selectedCategory
      ? toy.category === selectedCategory
      : true
    const isPriceMatch =
      toy.price >= priceRange[0] && toy.price <= priceRange[1]
    return isCategoryMatch && isPriceMatch
  })

  const paginatedToys = filteredToys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const addToWishList = toy => {
    const wishListData = {
      toyId: toy._id,
      userId: user.email
    }

    axios
      .post(`https://playtoy-server.vercel.app/wishList`, wishListData)
      .then(result => {
        if (result.data.insertedId) {
          refetch()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Product added to wishlist!`,
            timer: 3000,
            confirmButtonText: 'Go to WishList',
            denyButtonText: `Don't go`,
            timerProgressBar: true
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/wishList')
            }
          })
        }
      })
      .catch(error => {
        console.error('Error adding to wishlist:', error)
        Swal.fire({
          icon: 'error',
          title: 'Add Failed',
          text: 'Something went wrong! or item already in your wishlist'
        })
      })
  }

  if (!toysData) {
    return (
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-semibold mb-6'>Your Cart</h1>
        <Skeleton active />
      </div>
    )
  }

  return (
    <div className='py-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-4'>Categories</h2>
        <div className='block lg:hidden mb-4'>
          <button
            onClick={() => setIsFilterVisible(prev => !prev)}
            className='px-4 py-2 bg-black text-white hover:bg-gray-800 transition'
          >
            {isFilterVisible ? <IoCloseCircle /> : 'Filter'}
          </button>
        </div>

        <div
          className={`flex flex-wrap gap-4 ${
            isFilterVisible || window.innerWidth >= 1024 ? 'block' : 'hidden'
          } lg:flex`}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCategory(category)
                setIsFilterVisible(false)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-800'
              } hover:bg-black hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {location.pathname.includes('shop') && (
          <button
            onClick={() => {
              setSelectedCategory('')
              setCurrentPage(1)
            }}
            className='mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-800 transition'
          >
            All toys
          </button>
        )}
      </div>
      {location.pathname.includes('shop') && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold'>Filter by Price</h3>
          <Slider
            range
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onChange={handlePriceChange}
            marks={{
              0: '$0',
              100: '$100',
              200: '$200',
              300: '$300',
              400: '$400',
              500: '$500'
            }}
            tipFormatter={value => `$${value}`}
          />
          <div className='mt-2'>
            <span>Price Range: </span>
            <span>
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>
      )}
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {paginatedToys.length > 0 ? (
            paginatedToys.map(toy => (
              <div key={toy._id} className='p-4 relative overflow-hidden group'>
                <motion.div whileHover={{ scale: 1.1 }} className='w-full h-96'>
                  <img
                    src={toy.image}
                    alt={toy.name}
                    className='w-full h-full object-contain md:object-cover'
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  onClick={() => setIsTapped(!isTapped)}
                  animate={
                    isTapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  className='absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100'
                >
                  <Popover content='Add to Cart' placement='top'>
                    <Link to={`/toysDetails/${toy._id}`}>
                      <button className='bg-white p-3 rounded-full hover:bg-black hover:text-white'>
                        <ShoppingCartOutlined />
                      </button>
                    </Link>
                  </Popover>
                  <Popover content='Quick View' placement='top'>
                    <button
                      className='bg-white p-3 rounded-full hover:bg-black hover:text-white'
                      onClick={() => handleQuickView(toy)}
                    >
                      <EyeOutlined />
                    </button>
                  </Popover>
                  <Popover content='Add to Wishlist' placement='top'>
                    <button
                      onClick={() => addToWishList(toy)}
                      className='bg-white p-3 rounded-full hover:bg-black hover:text-white'
                    >
                      <HeartOutlined />
                    </button>
                  </Popover>
                </motion.div>

                <h4 className='text-lg font-bold mt-2'>{toy.name}</h4>
                <p className='text-gray-600 mt-1'>Price: ${toy.price}</p>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500'>No products found</p>
          )}
        </div>
      </div>

      <div className='mt-6 flex justify-center'>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredToys.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title={selectedToy?.name}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedToy && (
          <div>
            <img
              src={selectedToy.image}
              alt={selectedToy.name}
              className='w-full h-64 object-contain mb-4'
            />

            <p>
              <strong>Category:</strong> {selectedToy.category}
            </p>
            <p>
              <strong>Description:</strong> {selectedToy.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedToy.price}
            </p>

            <div className='mt-4 flex items-center gap-4'>
              <p>
                <strong>Quantity:</strong>
              </p>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() =>
                    setQuantity(prev => (prev > 1 ? prev - 1 : prev))
                  }
                  className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
                >
                  -
                </button>
                <span className='text-lg'>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
                >
                  +
                </button>
              </div>
            </div>

            <div className='mt-4 flex justify-between'>
              <button
                onClick={() => handleAddToCart(selectedToy, quantity)}
                className='px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition'
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Category
