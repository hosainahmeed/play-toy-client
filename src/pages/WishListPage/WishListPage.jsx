import { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleRemove } from 'react-icons/ci';
import useAuth from '../../Components/Hook/useAuth';
import Swal from 'sweetalert2';

function WishListPage() {
  const [wishList, setWishList] = useState([]);
  const [toysData, setToysData] = useState([]);
  const { user } = useAuth();

  // Fetch all products
  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(res => {
        setToysData(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  // Fetch wishlist for the current user
  useEffect(() => {
    axios
      .get('http://localhost:5000/wishList', {
        params: { userId: user.email }
      })
      .then(res => {
        setWishList(res.data || []);
      })
      .catch(err => {
        console.error('Error fetching wishlist:', err);
        setWishList([]);
      });
  }, [user.email]);

  // Remove an item from the wishlist
  const removeFromWishList = toyId => {
    axios
      .delete(`http://localhost:5000/wishList`, {
        params: { userId: user.email, toyId }
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Item removed from wishlist.'
        });
        // Update local state to reflect the removed item
        setWishList(prev => prev.filter(item => item.toyId !== toyId));
      })
      .catch(error => {
        console.error('Error removing from wishlist:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove item from wishlist.'
        });
      });
  };

  if (wishList.length === 0) {
    return <div className="text-center p-6">Your wish list is empty!</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Wish List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishList.map(({ toyId }) => {
          const toyDetails = toysData.find(item => item._id === toyId);
          return (
            <div
              key={toyId}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              {toyDetails ? (
                <>
                  <img
                    src={toyDetails.image}
                    alt={toyDetails.name}
                    className="w-24 h-24 object-cover mb-4 rounded-full overflow-hidden"
                  />
                  <h3 className="text-xl font-semibold">{toyDetails.name}</h3>
                  <p className="text-gray-600">{toyDetails.description}</p>
                </>
              ) : (
                <p className="text-gray-500">Toy details not found</p>
              )}
              <button
                onClick={() => removeFromWishList(toyId)}
                className="btn-circle bg-red-500 text-white flex items-center justify-center hover:bg-gray-800 transition mt-4"
              >
                <CiCircleRemove className="text-2xl" />
                <span className="sr-only">Remove from Wishlist</span>
              </button>
              <div className="mt-4 flex justify-between">
                <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishListPage;
