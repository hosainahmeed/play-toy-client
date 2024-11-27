import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/cart')
      .then((res) => {
        setCartItems(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching cart items:', err);
      });
  }, []);

  useEffect(() => {
    const price = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(price);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/cart/${itemId}`)
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Item removed from cart.',
        });
      })
      .catch((err) => {
        console.error('Error removing item:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove item from cart.',
        });
      });
  };

  const handlePurchase = () => {
    axios
      .post('http://localhost:5000/purchase', { cartItems })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Purchase Successful',
          text: 'Your purchase was successful.',
        });
        setCartItems([]);
        setTotalPrice(0);
        navigate('/'); 
      })
      .catch((err) => {
        console.error('Error processing purchase:', err);
        Swal.fire({
          icon: 'error',
          title: 'Purchase Failed',
          text: 'There was an issue with your purchase.',
        });
      });
  };

  if (cartItems.length === 0) {
    return <div className="text-center p-6">Your cart is empty!</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow hover:shadow-md transition">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-semibold">Price: ${item.price}</p>
            <p className="text-lg">Quantity: {item.quantity}</p>
            <button
              onClick={() => handleRemoveItem(item._id)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-semibold">Total Price: ${totalPrice}</h2>
        <Button
          type="primary"
          size="large"
          onClick={handlePurchase}
          className="mt-4 bg-black text-white hover:bg-gray-800"
        >
          Purchase
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
