'use client'
import React, { useEffect, useState } from 'react'
import {favoriteitem } from '../types';
import Navbar from '../components/navbar';
import FavoriteItem from '../components/favoriteitem';

export default function page() {
    const [favoriteItems, setfavoriteItems] = useState<favoriteitem[]>([])
    const usertoken = localStorage.getItem('usertoken')
    
;

    const getFavoriteItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get-favorite', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setfavoriteItems(data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const updateFavoriteItems = (itemId:number) => {
        setfavoriteItems((prevFavoriteItems) => prevFavoriteItems.filter(item => item.id !== itemId));
      }

    useEffect(() => {
        getFavoriteItems();
    }, [])
  return (
    <>
    <Navbar/>
    <div className='w-full h-[100vh] grid grid-cols-3 justify-center items-center'>
    <div className='h-1/2 w-full flex flex-col col-span-2 justify-center items-center'>
        {favoriteItems.map(product => (
            product.usertoken === usertoken ?
        <FavoriteItem key={product.id} favorite={product} updateFavoriteItem={updateFavoriteItems} />
        : null 
      ))}
    </div>
    </div>
    </>
  )
}