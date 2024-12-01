import { useLoaderData } from 'react-router-dom'
import { Image, Modal } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import useAuth from '../../Components/Hook/useAuth'
import Swal from 'sweetalert2'
import useCart from '../../Components/Hook/useCart'

function ToyseDetails () {
  const toy = useLoaderData()
  const [quantity, setQuantity] = useState(1)
  const { user } = useAuth()
  const { refetchCart } = useCart()
  const [previewVisible, setPreviewVisible] = useState(false)

  if (!toy) {
    return <div>Loading...</div>
  }

  const handleImagePreview = () => {
    setPreviewVisible(true)
  }

  const {
    _id,
    name,
    image,
    price,
    category,
    description,
    stars,
    reviews,
    features
  } = toy

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
      toyId: _id,
      name: name,
      image: image,
      price: price,
      category: category,
      quantity
    }
    console.log(cartItem)

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

  return (
    <div className='container mx-auto p-6'>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-1/2 mb-6 md:mb-0'>
          <div className='relative'>
            <Image
              width='100%'
              src={image}
              alt={name}
              className='rounded-lg shadow-lg cursor-pointer'
              onClick={handleImagePreview}
            />
          </div>
        </div>

        <div className='w-full md:w-1/2 pl-0 md:pl-12'>
          <h1 className='text-3xl font-semibold mb-4'>{name}</h1>
          <p className='text-lg text-gray-600 mb-4'>{description}</p>
          <p className='text-xl font-bold mb-4'>${price}</p>

          <div className='flex items-center mb-4'>
            <span className='text-yellow-500'>
              {'★'.repeat(Math.round(stars))}
            </span>
            <span className='ml-2 text-gray-500'>({reviews} reviews)</span>
          </div>

          <div className='mb-4'>
            <h2 className='text-xl font-semibold'>Features:</h2>
            <ul className='list-disc pl-5 space-y-2'>
              {features.map((feature, index) => (
                <li key={index} className='text-gray-700'>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-4'>
            <span className='font-semibold'>Category:</span> {category}
          </div>

          {/* Quantity Selector */}
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

          {/* Buy Button */}
          <button
            onClick={() => handleAddToCart(toy, quantity)}
            className='px-6 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 transition'
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
      >
        <Image width='100%' src={image} alt={name} />
      </Modal>
    </div>
  )
}

export default ToyseDetails
