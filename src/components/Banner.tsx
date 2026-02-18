import img from '../assets/banner2.png';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <div className="w-full rounded-xl bg-gray-200 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col justify-center gap-4 p-8 md:p-16 md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Shop Your <br />
          Favorites Now!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-2">
          Grab everything you love with
          <span className="text-red-600 font-bold">15% OFF</span> on all
          products. Limited time offer!
        </p>

        <Link to="/">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold h-15 w-40 rounded-lg transition duration-200 cursor-pointer">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-4 md:p-8">
        <img
          src={img}
          alt="Shopping Banner"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
