import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"

const WishlistContext = createContext()

export const useWishlist = () => {
  return useContext(WishlistContext)
}

export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState([])
  const [toysData, setToysData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = (userEmail) => {
    axios
      .get('http://localhost:5000/wishList', { params: { userId: userEmail } })
      .then((response) => {
        setWishList(response.data || [])
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error)
      })
  }

  const fetchToysData = () => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setToysData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching toys data:', error)
      })
  }

  const removeFromWishList = (userEmail, toyId) => {
    axios
      .delete('http://localhost:5000/wishList', {
        params: { userId: userEmail, toyId },
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Item removed from wishlist.',
        })
        fetchWishlist(userEmail)
      })
      .catch((error) => {
        console.error('Error removing from wishlist:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove item from wishlist.',
        })
      })
  }

  const handleAddToCart = (userEmail, toy, quantity = 1) => {
    const cartItem = {
      userId: userEmail,
      toyId: toy._id,
      name: toy.name,
      image: toy.image,
      price: toy.price,
      category: toy.category,
      quantity,
    }

    axios
      .post('http://localhost:5000/cart', cartItem)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added to cart!',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          removeFromWishList(userEmail, toy._id)
        })
      })
      .catch((error) => {
        console.error('Error adding to cart:', error)
        Swal.fire({
          icon: 'error',
          title: 'Add Failed',
          text: 'This is Already in Your Cart!',
        }).then(()=>{
          removeFromWishList(userEmail, toy._id)
        })
      })
  }

  const refetch = (userEmail) => {
    setLoading(true)
    fetchWishlist(userEmail)
    fetchToysData()
    setLoading(false)
  }

  useEffect(() => {
    if (wishList.length === 0 && toysData.length === 0) {
      fetchToysData()
      setLoading(false)
    }
  }, [wishList, toysData])

  return (
    <WishlistContext.Provider
      value={{
        wishList,
        toysData,
        loading,
        fetchWishlist,
        removeFromWishList,
        handleAddToCart,
        refetch,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
