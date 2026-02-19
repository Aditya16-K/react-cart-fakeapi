import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart } = useContext(StoreContext);

  const discountPercent = 15;

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const discountedTotal = cart.reduce(
    (acc, item) => acc + item.price * (1 - discountPercent / 100),
    0
  );

  const itemCount = cart.length;

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      removeFromCart(id);
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="main-container py-10 px-4 lg:px-16">
      {/* Header */}
      <div className="h-20 items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 ">
          Shopping Cart
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-10 text-center text-gray-500 font-medium">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => {
              const discountedPrice = item.price * (1 - discountPercent / 100);

              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-28 w-full md:w-28 object-contain rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg md:text-xl line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl md:text-2xl font-bold text-red-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-400 text-sm md:text-base">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-green-600 text-sm md:text-base font-semibold">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="flex md:flex-col btn-container items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="flex items-center w-25 justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 transition duration-200 disabled:opacity-50"
                    >
                      <FaTrash />
                      {deletingId === item.id ? 'Removing...' : 'Remove'}
                    </button>

                    <Link to={`/product/${item.id}`}>
                      <button className="flex w-25 items-center justify-center gap-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition duration-200">
                        <FaEye /> Details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 ">
          <div className="sticky top-10 top-bottom rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-gray-300 main-container">
            <h2 className="text-2xl font-bold text-gray-800 underline mb-2">
              Order Summary
            </h2>

            <div className="flex flex-col gap-4 border-b pb-4">
              <div className="flex justify-between text-lg md:text-2xl">
                <span>Total Items:</span>
                <span className="font-bold text-blue-600">{itemCount}</span>
              </div>

              <div className="flex justify-between text-lg md:text-2xl">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-700">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg md:text-2xl">
                <span>Discount ({discountPercent}%):</span>
                <span className="font-bold text-green-600">
                  -${(subtotal - discountedTotal).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-xl md:text-2xl font-semibold">Total:</span>
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                ${discountedTotal.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button className="w-50 h-10 md:h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200">
                Proceed to Checkout
              </button>

              <Link to="/">
                <button className="w-50 h-10 md:h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition duration-200">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
