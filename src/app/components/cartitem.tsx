'use client'
import React, { useState } from 'react';
import { cartable, cartitem } from '../types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartItem({ cart, updateCartItem}: cartable) {
  const router = useRouter()
  const [Quantity, setQuantity] = useState(cart.quantity)
    

  const handleAddQuantity = async () => {
    const cartItem = {
      
      image: cart.image,
      product_category: cart.product_category,
      usertoken: localStorage.getItem('usertoken'),
      product_name: cart.product_name,
      product_id: cart.id,
      price: cart.price,
      quantity: Quantity + 1,
    }

    const response = await fetch('https://raysflaskeccomerce.onrender.com/add-item-quantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
        if( response.status == 200){
          const data = await response.json()
          setQuantity(data.quantity)
          
          
          
        }
      }
      const handleSubtractQuantity = async () => {
        if (Quantity > 1) {
          const cartItem = {
            image: cart.image,
            product_category: cart.product_category,
            usertoken: localStorage.getItem('usertoken'),
            product_name: cart.product_name,
            product_id: cart.id,
            price: cart.price,
            quantity: Quantity - 1,
            
          };
      
          const response = await fetch('https://raysflaskeccomerce.onrender.com/remove-item-quantity', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
          });
      
          if (response.status === 200) {
            const data = await response.json();
            setQuantity(data.quantity);
            
            
          }
        }
      }
      

      const toSlug = () => {
        router.push(`/${cart.product_name}/${cart.product_id}`)
      }
    
  const deleteCartItems = async () => {
    try {
      const response = await fetch(`https://raysflaskeccomerce.onrender.com/get-cart-items/${cart.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Item deleted');
        updateCartItem(cart.id);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="border-t-2 flex flex-col sm:flex-row items-center p-4 sm:p-6 md:w-3/4 mx-auto">
      <div onClick={toSlug} className="mb-4 sm:mr-4 sm:mb-0">
        <Image
          src={cart.image}
          alt={cart.product_name}
          className="border-2 w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="font-bold text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl mb-2">{cart.product_name}</div>
        <div className="text-sm mb-2">{cart.product_category}</div>
        
        <div className="text-sm mb-2">Quantity: <button onClick={handleSubtractQuantity}>-</button> {Quantity}  <button onClick={handleAddQuantity}>+</button></div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">${cart.price}.00</div>
          <svg
            onClick={deleteCartItems}
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="1.5"
            className="cursor-pointer"
          >
            <path d="M6 6L18 18M6 18L18 6L6 18Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}



