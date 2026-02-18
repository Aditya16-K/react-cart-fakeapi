import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCart';
import { StoreContext } from '../context/StoreContext';
import type { Product } from '../types/Product';
import CategoryButtons from '../components/CategoryButtons';
import Banner from '../components/Banner';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { searchQuery, category } = useContext(StoreContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          'https://fakestoreapi.com/products'
        );
        setProducts(res.data);
      } catch (err: Error | unknown) {
        setError('Failed to fetch products: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (!products) return null;

  const filteredProducts = products
    .filter((p) => {
      if (category === 'all') return true;

      if (category === 'fashion') {
        return (
          p.category === "men's clothing" || p.category === "women's clothing"
        );
      } else if (p.category === category) {
        return true;
      }
      return false;
    })
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="main-container py-8">
      <Banner />
      <CategoryButtons />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
