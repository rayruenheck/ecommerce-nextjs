'use client'
import React from 'react'
import { favoriteable} from '../types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FavoriteItem({ favorite, updateFavoriteItem }: favoriteable) {
  const router = useRouter()
    

      const toSlug = () => {
        router.push(`/${favorite.product_name}/${favorite.product_id}`)
      }
   
  
    return (
        <div className="min-w-[250px] border rounded-md overflow-hidden bg-white shadow-lg transform hover:scale-105 transition-transform duration-300">
          <img onClick={toSlug} src={favorite.image} alt={favorite.product_name} className="w-full h-48 object-contain" />
          <div className="p-4">
            <div className="h-24 overflow-hidden">
              <h2 className="text-lg font-semibold mb-2">{favorite.product_name}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">{favorite.product_category}</p>
            <div className="flex justify-between mt-4">
             
            </div>
          </div>
        </div>
      );
}