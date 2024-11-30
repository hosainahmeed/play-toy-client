import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useCart from '../../Components/Hook/useCart'

function CartPage () {
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const { cart, isLoading,refetchCart } = useCart()

  useEffect(() => {
    const price = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    setTotalPrice(price)
  }, [cart])

  const handleRemoveItem = itemId => {
    console.log(itemId);
    axios
      .delete(`http://localhost:5000/cart/${itemId}`)
      .then(() => {
        refetchCart()
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Item removed from cart.'
        })
      })
      .catch(err => {
        console.error('Error removing item:', err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove item from cart.'
        })
      })
  }

  const handlePurchase = () => {
    navigate('/payment')
  }

  if (isLoading) {
    return (
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-semibold mb-6'>Your Cart</h1>
        <Skeleton active />
      </div>
    )
  }

  if (cart.length === 0) {
    return <div className='text-center p-6'>Your cart is empty!</div>
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-semibold mb-6'>Your Cart</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {cart.map(item => (
          <div
            key={item._id}
            className='border p-4 rounded-lg shadow-lg hover:shadow-xl transition'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-24 h-24 object-cover mb-4 rounded-full mx-auto'
            />
            <h3 className='text-xl font-semibold text-center'>{item.name}</h3>
            <p className='text-gray-600 text-center mb-2'>{item.description}</p>
            <p className='text-lg font-semibold text-center'>
              Price: ${item.price}
            </p>
            <p className='text-lg text-center'>Quantity: {Number(item.quantity)}</p>
            <button
              onClick={() => handleRemoveItem(item._id)}
              className='mt-4 text-red-500 hover:text-red-700 text-center w-full'
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className='mt-6 text-right'>
        <h2 className='text-2xl font-semibold'>Total Price: ${totalPrice.toFixed(2)}</h2>
        <Button
          size='large'
          onClick={handlePurchase}
          className='mt-4 bg-black text-white hover:bg-gray-800 w-full md:w-auto'
        >
          Purchase
        </Button>
      </div>
    </div>
  )
}

export default CartPage
