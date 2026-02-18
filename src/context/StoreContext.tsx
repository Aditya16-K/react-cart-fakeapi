import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../types/Product';

interface StoreContextType {
  cart: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
