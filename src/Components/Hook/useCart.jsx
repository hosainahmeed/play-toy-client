import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosSecure.get("/cart");
        setCart(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [axiosSecure]);

  return { cart, loading, error,setCart };
};

export default useCart;
