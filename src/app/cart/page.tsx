"use client";
import React, { useEffect, useState } from 'react';
import { cartitem } from '../types';
import CartItem from '../components/cartitem';
import Navbar from '../components/navbar';
import LoginLogout from '../components/login-logout';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<cartitem[]>([]);
  const userToken = localStorage.getItem('usertoken');
  

  const getCartItems = async () => {
    try {
      const response = await fetch('https://raysflaskeccomerce.onrender.com/get-cart-items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const updateCartItems = (itemId: number) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const calculateTotal = () => {
    const userCartItems = cartItems.filter((item) => item.usertoken === userToken);
    return userCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  function calculateTax(subtotal: number): number {
    const userCartItems = cartItems.filter((item) => item.usertoken === userToken);
    const taxRate: number = 0.065;
    const taxAmount: number = userCartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * taxRate;
    return taxAmount;
  }


  return (
    <>
      <LoginLogout />
      <Navbar />
      <div className='w-full h-screen'>
        <div className='container mx-auto p-8'>
          <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='col-span-2 space-y-4'>
              {cartItems.map((product) => (
                product.usertoken === userToken ? (
                  <CartItem key={product.id} cart={product} updateCartItem={updateCartItems}/>
                ) : null
              ))}
            </div>

            <div className='col-span-1 border p-4'>
              <h2 className='text-xl font-bold mb-4'>Order Summary</h2>

              <div className='flex flex-col space-y-2'>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping and Handling:</span>
                  <span>$5.00</span>
                </div>
                <div className='flex justify-between'>
                  <span>Estimated Tax:</span>
                  <span>${calculateTax(calculateTotal()).toFixed(2)}</span>
                </div>
              </div>

              <div className='text-xl font-bold mt-4'>
                <div className='flex justify-between'>
                  <span>Total:</span>
                  <span>${(calculateTotal() + 5 + calculateTax(calculateTotal())).toFixed(2)}</span>
                </div>
              </div>

              <button className='bg-black text-white rounded-full py-3 px-6 hover:bg-gray-800 transition duration-300 mt-4'>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}