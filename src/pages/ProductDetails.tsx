import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import type { Product } from '../types/Product';
import { StoreContext } from '../context/StoreContext';
import { ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium animate-pulse">
          Loading product details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="main-container py-20 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  if (!product) return null;

  const discountPrice = (product.price * (1 - 15 / 100)).toFixed(2);

  return (
    <div className="main-container py-6 md:py-12 px-4 sm:px-6 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-center">
        {/* Image Section */}
        <div className="flex justify-center items-center bg-gray-200   rounded-2xl shadow-sm p-6 sm:p-10">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 sm:h-80 `md:h-[450px]` object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-2 space-y-4 md:space-y-6">
          <div>
            <p className="text-xs sm:text-sm text-blue-600 font-bold uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center  text-yellow-400  rounded-md text-xl font-bold">
              <Star size={16} className="fill-current mr-1" />
              {product.rating?.rate}
            </div>
            <span className="text-gray-500 text-sm sm:text-base">
              ({product.rating?.count} verified reviews)
            </span>
          </div>

          <div className="border-t border-b border-gray-100 py-4">
            <h3 className="text-gray-900 text-lg font-semibold mb-2">
              Description :
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="flex items-center  justify-between">
            <div className="flex  flex-col">
              <p className="text-3xl sm:text-4xl font-bold text-green-500">
                ${discountPrice}
              </p>
              <p className="text-xs sm:text-sm line-through text-gray-400">
                ${product.price}
              </p>
            </div>

            <span className="text-green-700 bg-green-50 px-3 h-8 w-20 rounded-xl text-xs font-bold uppercase flex  justify-center items-center">
              In Stock
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className=" w-40 h-13 bg-blue-900 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg cursor-pointer shadow-blue-700 active:scale-105"
          >
            <ShoppingCart size={22} />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
