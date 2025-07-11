import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const BestSeller = () => {

   const {products} = useContext(ShopContext);
   const [bestSeller, setBestSeller] = useState([]);

   useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5));
   }, [products]) // Added dependency array

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas modi voluptatum labore repellendus reprehenderit recusandae soluta est ullam architecto aliquam ipsam obcaecati itaque totam odio at ex quia, enim impedit.
            </p>

        </div>

        {/* Display the best seller products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestSeller.map((item, index) => (
                <div key={index} className='text-gray-700 cursor-pointer'>
                    <div className='overflow-hidden'>
                        <img 
                            className='hover:scale-110 transition ease-in-out' 
                            src={item.image[0]} 
                            alt={item.name} 
                        />
                    </div>
                    <p className='pt-3 pb-1 text-sm'>{item.name}</p>
                    <p className='text-sm font-medium'>${item.price}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BestSeller