'use client'
import React, { useEffect, useState } from 'react'
import {favoriteitem } from '../types';
import Navbar from '../components/navbar';
import FavoriteItem from '../components/favoriteitem';
import LoginLogout from '../components/login-logout';

export default function FavoritesPage() {
    const [favoriteItems, setFavoriteItems] = useState<favoriteitem[]>([]);
    const userToken = getUserToken();

    function getUserToken() {      
      if (typeof window !== 'undefined') {
        
        return localStorage.getItem('usertoken') || ''
      }      
        ;
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
  
    const updateFavoriteItems = (itemId: number) => {
      setFavoriteItems((prevFavoriteItems) => prevFavoriteItems.filter((item) => item.id !== itemId));
    };
  
    useEffect(() => {
      getFavoriteItems();
    }, []);
  
    return (
        <>
        <LoginLogout />
        <Navbar />
        <div className='w-full h-screen'>
          <div className='container mx-auto p-8'>
            <h1 className='text-3xl font-bold mb-8 ml-4'>Your Favorites</h1>
  
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {favoriteItems.length > 0 ? (
                favoriteItems.map((product) =>
                  product.usertoken === userToken ? (
                    <FavoriteItem key={product.id} favorite={product} updateFavoriteItem={updateFavoriteItems} />
                  ) : null
                )
              ) : (
                <div className='text-xl text-gray-600 text-center'>
                  You have not added any items to your favorites yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }