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
        console.log(data);
        setData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className=' flex justify-center h-full'>
    <div className='flex flex-wrap m-[20px] h-4/5'>
      {data.map(product => (
        <ProductCard key={product.id} title={product.title} category={product.category} price={product.price} image={product.image} id={product.id} description={product.description} /> 
      ))}
    </div>
    </main>
  );
}
