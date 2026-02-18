import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import type { Product } from '../types/Product';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useContext(StoreContext);

  const discountPercent = 15;
  const discountPrice = (product.price * (1 - 15 / 100)).toFixed(2);

  return (
    <div className="group flex flex-col h-full bg-white border justify-between border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative bg-gray-100 h-40 sm:h-48 md:h-56 flex items-center justify-center overflow-hidden p-4">
        <Link
          to={`/product/${product.id}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={product.image}
            className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
            alt={product.title}
          />
        </Link>

        {/* discount badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-center text-[10px] sm:text-xs font-bold w-10 h-4 rounded shadow-md">
          -{discountPercent}%
        </div>

        {/* heart badge */}
        <button className="absolute top-2 left-2  backdrop-blur-sm rounded-full p-1.5 sm:p-2  transition shadow-sm">
          <FaHeart
            size={18}
            className="text-gray-400  hover:text-red-500 transition-colors"
          />
        </button>
      </div>

      <div className=" inner-container flex flex-col justify-center  flex-1  gap-1 w-70">
        <Link to={`/product/${product.id}`} className="block">
          <h2 className="text-xl sm:text-base md:text-2xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition  ">
            {product.title}
          </h2>
        </Link>

        {/* description */}
        <div className="flex center">
          <p className="text-sm line-clamp-2">{product.description}</p>
        </div>

        {/* ratting */}
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-700 font-medium">
            {product.rating?.rate ?? '4.5'}
          </span>
          <span className="text-gray-400">({product.rating?.count ?? 0})</span>
        </div>

        {/* pricing */}
        <div className="flex items-baseline flex-wrap gap-2 mt-auto">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
            ${discountPrice}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 line-through">
            ${product.price}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full h-8 cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-105"
        >
          <span>ADD TO</span>
          <FaShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
