import React, { useEffect, useState } from 'react'
import { product } from '../types';
import ProductCard from './productCard';

export default function Electronics() {
    const [data, setData] = useState<product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        setData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className=' flex justify-center'>
    <div className='flex flex-wrap w-full m-[20px]'>
      {data.map(product => (
        product.category === 'electronics' ?
        <ProductCard key={product.id} title={product.title} category={product.category} price={product.price} image={product.image} id={product.id} description={product.description} /> 
        : null 
      ))}
    </div>
    </main>
  );
  
}
