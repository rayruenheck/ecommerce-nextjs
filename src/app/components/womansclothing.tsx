import React, { useEffect, useState } from 'react';
import { product } from '../types';
import ProductCard from './productCard';

export default function MensClothing() {
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
    <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-8">Womens Clothing</h1>
    <main className='flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.map((product) =>
          product.category === "women's clothing" ? (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.image}
              id={product.id}
              description={product.description}
            />
          ) : null
        )}
      </div>
    </main>
  </div>
  );
}
