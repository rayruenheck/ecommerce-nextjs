"use client"
import React, { useEffect, useState } from 'react'
import { favoriteitem, product } from '../types'

export default function ProductCard(prop : product) {
  const [favoriteItems, setFavoriteItems] = useState<favoriteitem[]>([]);

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

  const isFavorite = favoriteItems.some((item) => item.usertoken === localStorage.getItem('usertoken') && item.product_name === prop.title);
  const fill = isFavorite ? '#ff536f' : '#fff6f8'

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const cartItem = {
      'image' : prop.image,
      'product_category' : prop.category,
      'usertoken': localStorage.getItem('usertoken'),
      'product_name': prop.title,
      'price': prop.price,
      'quantity' : '1'
    };

    
      const response = await fetch('http://127.0.0.1:5000/add-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.status === 200) {
        alert('Item added to Cart');
        
      } else if (response.status === 201) {
        const response = await fetch('http://127.0.0.1:5000/add-item-quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
      }  else {
        alert('failed to add item')
      }
  }
  
  
  
  const handleFavoriteItem = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const favoriteItem = {
      'product_id': prop.id,
      'image': prop.image,
      'product_category': prop.category,
      'usertoken': localStorage.getItem('usertoken'),
      'product_name': prop.title,
      'price': prop.price,
    };
  
    const response = await fetch('http://127.0.0.1:5000/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteItem),
    });
  
    if (response.status === 200) {
      getFavoriteItems()
    } else if (response.status === 201) {
      const response = await fetch(`http://127.0.0.1:5000/get-favorite/${prop.id}/${localStorage.getItem('usertoken')}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      getFavoriteItems();
    }
  }



    
  return (
    <div className="min-w-[250px]">
      <div className="grid grid-rows-10 h-full">
        <div className="row-span-9">
          <img src={prop.image} alt={prop.title} className="w-[250px] h-[200px]" />
        </div>
        <div className="row-span-1 p-2 flex justify-end h-full flex-col">
          <h2 className="text-lg font-semibold">{prop.title}</h2>
          <p className="text-sm text-gray-600">{prop.category}</p>
          <p className="text-sm font-semibold">${Math.ceil(parseInt(prop.price))}</p>
        </div>
      </div>
      <button onClick={handleAddItem}>Add to Cart</button>
      <svg onClick={localStorage.getItem('usertoken') ? handleFavoriteItem : ()=>{}} className='w-10 h-6' viewBox="0 0 24.00 24.00" fill={fill} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="1.272" strokeLinecap="round" strokeLinejoin="round"></path><text>2</text> </g></svg>
    </div>
  )
  
}
