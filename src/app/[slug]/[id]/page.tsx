'use client'
import LoginLogout from '@/app/components/login-logout';
import Navbar from '@/app/components/navbar';
import { favoriteitem, product } from '@/app/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function Page() {
  const { id } = useParams();
  const [favoriteItems, setFavoriteItems] = useState<favoriteitem[]>([])  
  const [product, setProduct] = useState<product>({
    id: 0,
    description: '',
    image: '',
    category: '',    
    title: '',
    price: '',
    })
    const isFavorite = favoriteItems.some(
      (item) => item.usertoken === localStorage.getItem('usertoken') && item.product_name === product.title
    );
    const fill = isFavorite ? '#ff536f' : '#fff6f8'


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

    const handleFavoriteItem = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const favoriteItem = {
        product_id: product.id,
        image: product.image,
        product_category: product.category,
        usertoken: localStorage.getItem('usertoken'),
        product_name: product.title,
        price: product.price,
      };
      
  
      try {
        const existingFavorite = favoriteItems.find(
          (item) => item.usertoken === localStorage.getItem('usertoken') && item.product_name === product.title
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
            `https://raysflaskeccomerce.onrender.com/get-favorite/${product.id}/${localStorage.getItem('usertoken')}`,
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
    
    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const cartItem = {
          image: product.image,
          product_category: product.category,
          usertoken: localStorage.getItem('usertoken'),
          product_name: product.title,
          product_id: product.id,
          price: product.price,
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
            alert('Item added to Cart');
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
  
    
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [id]);

  return (
    <>
      <LoginLogout />
      <Navbar />
      <div className="bg-gray-100">
        <div className="container  p-8 bg-white shadow-lg rounded-lg mt-16 max-w-screen-md mx-auto">
          {product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-700 text-lg mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
                <button
                  onClick={handleAddItem}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}