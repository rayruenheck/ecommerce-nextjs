'use client'
import React, { useEffect, useState } from 'react'
import { cartitem } from '../types';
import CartItem from '../components/cartitem';
import Navbar from '../components/navbar';

export default function page() {
    const [cartItems, setcartItems] = useState<cartitem[]>([])
    const usertoken = localStorage.getItem('usertoken')
    
;

    const getCartItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get-cart-items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setcartItems(data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const updateCartItems = (itemId:number) => {
        setcartItems((prevCartItems) => prevCartItems.filter(item => item.id !== itemId));
      }

    useEffect(() => {
        getCartItems();
    }, [])
    let total = 0
    for(let i =0;i < cartItems.length; i++){
        total = total + cartItems[i].price
    }
  return (
    <>
    <Navbar/>
    <div className='w-full h-[100vh] grid grid-cols-3 justify-center items-center'>
    <div className='h-1/2 w-full flex flex-col col-span-2 justify-center items-center'>
        {cartItems.map(product => (
            product.usertoken === usertoken ?
        <CartItem key={product.id} cart={product} updateCartItem={updateCartItems} />
        : null 
      ))}
    </div>
    <div className='col-span-1 border-2 w-1/2 h-1/2 border-black'>{total}</div>
    </div>
    </>
  )
}
