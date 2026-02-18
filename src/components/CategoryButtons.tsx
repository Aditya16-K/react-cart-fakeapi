import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const CategoryButtons = () => {
  const { category, setCategory } = useContext(StoreContext);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'jewelery', label: 'Jewelry' },
  ];

  const btnBase =
    'h-10 w-20  rounded-xl font-semibold transition-all duration-200 shadow-sm border text-sm md:text-base whitespace-nowrap cursor-pointer';
  const active = 'bg-blue-600 text-white border-blue-600 shadow-blue-200';
  const normal =
    'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300';

  return (
    <div className="w-full h-25 flex items-center justify-center px-4 mb-8">
      <div className="flex flex-wrap gap-3 md:gap-6 justify-center items-center max-w-4xl mx-auto">
        {categories.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setCategory(btn.id)}
            className={`${btnBase} ${category === btn.id ? active : normal} flex-1 sm:flex-none text-center`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
