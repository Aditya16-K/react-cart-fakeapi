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
      <h1 className="text-3xl font-bold mb-10 text-gray-900 h-15 ">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 justify-center ">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-10 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => {
              const discountedPrice = item.price * (1 - discountPercent / 100);
              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-28 w-28 object-contain rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-red-600">
                        ${discountedPrice.toFixed(2)}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        ${item.price.toFixed(2)}
                      </span>

                      <span className="text-green-600 text-sm font-semibold">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  </div>

                  <div className="w-30 flex flex-col gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="bg-red-500 hover:bg-red-600 text-white  rounded-lg font-medium transition duration-200 w-24 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <FaTrash />
                      {deletingId === item.id ? 'Removing...' : 'Remove'}{' '}
                    </button>

                    <Link to={`/product/${item.id}`}>
                      <button className=" w-25 bg-blue-600 hover:bg-blue-700 text-white font-semibold  rounded-lg flex items-center justify-center gap-2 transition cursor-pointer">
                        <FaEye /> Details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl shadow-lg p-8 sticky top-10 flex flex-col gap-6  inner-container border border-gray-500">
            <h2 className="text-2xl font-bold text-gray-800 underline">
              Order Summary
            </h2>

            <div className="flex flex-col gap-10 border-b pb-4">
              <div className="flex justify-between text-2xl">
                <span>Total Items:</span>
                <span className="font-bold text-blue-600">{itemCount}</span>
              </div>

              <div className="flex justify-between text-2xl">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-700">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-2xl">
                <span>Discount ({discountPercent}%):</span>
                <span className="font-bold text-green-600">
                  -${(subtotal - discountedTotal).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm flex justify-between items-center">
              <span className="text-2xl font-semibold">Total:</span>
              <span className="text-3xl font-bold text-blue-600">
                ${discountedTotal.toFixed(2)}
              </span>
            </div>

            {/* buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-50 h-8 bg-blue-600 hover:bg-blue-700 text-white font-bold  rounded-lg transition duration-200 cursor-pointer">
                Proceed to Checkout
              </button>

              <Link to="/">
                <button className="w-50 h-8 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  rounded-lg transition duration-200 cursor-pointer">
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
