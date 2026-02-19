import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Product, Profile } from '../types/Product';

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

  const [profile, setProfile] = useState<Profile>(
    JSON.parse(localStorage.getItem('profile') || '{}') || {
      name: '',
      email: '',
      phone: '',
      address: '',
    }
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
