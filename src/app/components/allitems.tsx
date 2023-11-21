import React, { useEffect, useState } from 'react';
import ProductCard from './productCard';
import { product } from '../types';

export default function AllItems() {
  const [data, setData] = useState<product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className='flex justify-center h-full'>
      <div className='flex flex-wrap m-4 sm:m-8 lg:m-12 xl:m-16'>
        {data.map((product) => (
          <div
            key={product.id}
            className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 sm:p-4 hover:shadow-lg transition duration-300'
          >
            <ProductCard
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.image}
              id={product.id}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </main>
  );
}