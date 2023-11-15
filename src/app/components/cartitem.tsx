'use client'
import React from 'react'
import { cartable, cartitem } from '../types'

export default function CartItem({cart, updateCartItem}:cartable) {
  
  const deleteCartItems = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/get-cart-items/${cart.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        

        if (response.ok) {
            console.log('item deleted')
            updateCartItem(cart.id)
        } else {
            console.error('Failed to fetch cart items');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
} 

  return (

    <div className=' border-t-2 grid-row-2 flex h-[200px] w-1/2'>
        <div className=' row-span-1 flex w-1/2 items-center '>
            <img src={cart.image} alt={cart.product_name} className="border-2 w-[150px] h-[150px] mr-[20px]" />
            <div className='flex flex-col w-full'>
                <div>{cart.product_name}</div>
                <div>{cart.product_category}</div>
                <div>Quantity {cart.quantity}</div>
            </div>
        </div>
        <div className='row-span-1 flex justify-end w-1/2'>
            ${cart.price}.00
        </div>
        <svg onClick={deleteCartItems} width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="1.152"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.096"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    </div>
  )
}
