import { useContext, useState, useEffect, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products || []);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    let productsCopy = [...products];

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => 
        category.includes(item.category)
      );
    }

    // Subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.includes(item.subCategory)
      );
    }

    // Sorting
    switch (sortType) {
      case 'low-high':
        return [...productsCopy].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...productsCopy].sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [products, category, subCategory, sortType, search, showSearch]);

  useEffect(() => {
    setFilterProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center gap-2'
          aria-expanded={showFilter}
          aria-label="Toggle filters"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown indicator"
          />
        </button>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  value={cat} 
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                  className='w-3' 
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  value={type} 
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(type)}
                  className='w-3' 
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            className='border-2 border-gray-300 text-sm px-2'
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            aria-label="Sort products"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to high</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p>No products match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;