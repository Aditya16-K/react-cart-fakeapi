import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { cart, profile, updateProfile } = useContext(StoreContext);
  const discountPercent = 15;

  const discountedTotal = cart.reduce(
    (acc, item) => acc + item.price * (1 - discountPercent / 100),
    0
  );

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);

  const handleSave = () => {
    updateProfile({ name, email, phone, address });
    setIsEditing(false);
  };

  return (
    <div className="main-container py-10 px-4 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Profile Section */}
        <div className="lg:col-span-1 bg-gray-100 rounded-xl top-bottom shadow-lg flex flex-col items-center gap-6 h-105 p-6">
          <img
            src="https://static.vecteezy.com/ti/gratis-vector/p1/12210707-arbeider-medewerker-zakenman-avatar-profiel-icoon-vector.jpg"
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-2 border-blue-500"
          />

          {isEditing ? (
            <div className="w-full flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300"
                placeholder="Full Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300"
                placeholder="Email"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300"
                placeholder="Phone"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300"
                placeholder="Address"
              />

              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800">
                {profile.name}
              </h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">{profile.phone}</p>
              <p className="text-gray-600 text-center">{profile.address}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition cursor-pointer"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-2 border border-gray-300 rounded-xl flex flex-col gap-4 p-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 underline">
            Your Cart Items
          </h2>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto max-h-[450px] pr-2 scroll-container">
            <div className="flex flex-col gap-5">
              {cart.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-10 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cart.map((item) => {
                  const discountedPrice =
                    item.price * (1 - discountPercent / 100);

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row items-center gap-4 bg-gray-200 border border-gray-900 rounded-xl shadow-md p-5 hover:shadow-lg transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-28 object-contain rounded-lg"
                      />

                      <div className="flex-1 inner-container">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold text-lg  text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition cursor-pointer">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-3 ">
                          <span className="text-xl font-bold  text-red-600">
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
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <>
              <div className="mt-6 bg-white/20 rounded-lg shadow-lg flex justify-between items-center">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${discountedTotal.toFixed(2)}
                </span>
              </div>

              <Link to="/cart">
                <button className="mt-4 h-8 w-50 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
                  Go to cart / Checkout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
