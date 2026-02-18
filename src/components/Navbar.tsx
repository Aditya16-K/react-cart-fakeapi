import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { ShoppingCart, User } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { cart, searchQuery, setSearchQuery } = useContext(StoreContext);

  return (
    <nav className="bg-[#f0e6ff] text-white main-container flex flex-wrap items-center justify-between py-4 gap-4 h-25">
      <Link to="/" className="order-1">
        <img src={logo} alt="Logo" className="h-10 md:h-13 cursor-pointer" />
      </Link>

      <div className="flex gap-6 text-xl items-center order-2 md:order-3">
        <Link to="/cart" className="relative cursor-pointer">
          <ShoppingCart color="black" size={30} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 text-red-600 text-sm font-semibold">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/profile" className="cursor-pointer">
          <User color="black" size={30} />
        </Link>
      </div>

      <div className="w-full order-3 md:order-2 md:w-1/2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 h-10 rounded-xl text-black border-gray-600 border-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
    </nav>
  );
};

export default Navbar;
