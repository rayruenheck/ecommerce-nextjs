"use client";
import React, { useEffect, useState } from 'react';
import { favoriteitem, product } from '../types';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function ProductCard(prop: product) {
  const [favoriteItems, setFavoriteItems] = useState<favoriteitem[]>([])
  const router = useRouter()

  const toSlug = () => {
    router.push(`/${prop.title}/${prop.id}`)
  }

  const toLogin = () => {
    
    router.push("/login")

  }

  const getFavoriteItems = async () => {
    try {
      const response = await fetch('https://raysflaskeccomerce.onrender.com/get-favorite', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoriteItems(data);
      } else {
        console.error('Failed to fetch favorite items');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getFavoriteItems();
  }, []);

  const isFavorite = favoriteItems.some(
    (item) => item.usertoken === localStorage.getItem('usertoken') && item.product_name === prop.title
  );
  const fill = isFavorite ? '#ff536f' : '#fff6f8';

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const cartItem = {
      image: prop.image,
      product_category: prop.category,
      usertoken: localStorage.getItem('usertoken'),
      product_name: prop.title,
      product_id: prop.id,
      price: prop.price,
      quantity: '1',
    };

    try {
      const response = await fetch('https://raysflaskeccomerce.onrender.com/add-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.status === 200) {
        
      } else if (response.status === 201) {
        const response = await fetch('https://raysflaskeccomerce.onrender.com/add-item-quantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleFavoriteItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const favoriteItem = {
      product_id: prop.id,
      image: prop.image,
      product_category: prop.category,
      usertoken: localStorage.getItem('usertoken'),
      product_name: prop.title,
      price: prop.price,
    };

    try {
      const existingFavorite = favoriteItems.find(
        (item) => item.usertoken === localStorage.getItem('usertoken') && item.product_name === prop.title
      );

      if (!existingFavorite) {
        const response = await fetch('https://raysflaskeccomerce.onrender.com/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteItem),
        });

        if (response.ok) {
          getFavoriteItems();
        }
      } else {
        const response = await fetch(
          `https://raysflaskeccomerce.onrender.com/get-favorite/${prop.id}/${localStorage.getItem('usertoken')}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          getFavoriteItems();
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  
  

  return (
    <div className="min-w-[250px] border rounded-md overflow-hidden bg-white shadow-lg transform hover:scale-105 transition-transform duration-300">
      <Image onClick={toSlug} src={prop.image} alt={prop.title} className="w-full h-48 object-contain" />
      <div className="p-4">
        <div className="h-24 overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">{prop.title}</h2>
        </div>
        <p className="text-sm text-gray-600 mb-2">{prop.category}</p>
        <p className="text-sm font-semibold">${Math.ceil(parseInt(prop.price))}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={localStorage.getItem('usertoken') ? handleAddItem : toLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add to Cart
          </button>
          <svg
            onClick={localStorage.getItem('usertoken') ? handleFavoriteItem : () => {}}
            className={`w-6 h-6 cursor-pointer ${fill === '#fff6f8' ? 'text-gray-500' : 'text-red-500'}`}
            fill={fill}
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000"
              strokeWidth="1.272"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
