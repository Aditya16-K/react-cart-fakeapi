import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../types/Product';

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface StoreContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  profile: Profile;
  updateProfile: (updatedProfile: Profile) => void;
}

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  //  Profile in data store in the local storage
  const [profile, setProfile] = useState<Profile>(
    JSON.parse(localStorage.getItem('profile') || '{}') || {
      name: 'User',
      email: 'example@gmail.com',
      phone: '+1 123 456 789',
      address: '123 Main Street, New York, NY, USA',
    }
  );

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
        profile,
        updateProfile,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
