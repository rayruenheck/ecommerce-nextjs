import React, { useEffect, useState } from 'react'
import { product } from '../types';
import ProductCard from './productCard';

export default function MensClothing() {
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
      <main className=' flex justify-center '>
      <div className='flex w-full m-[20px] flex-wrap'>
        {data.map(product => (
          product.category === 'men\'s clothing' ?
          <ProductCard key={product.id} title={product.title} category={product.category} price={product.price} image={product.image} id={product.id} description={product.description} /> 
          : null
        ))}
      </div>
      </main>
    );
}
