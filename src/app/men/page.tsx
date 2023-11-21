'use client'
import React from 'react'
import MensClothing from '../components/mensclothing'
import Navbar from '../components/navbar'
import LoginLogout from '../components/login-logout'

export default function page() {
  return (
    <div>
      <LoginLogout/>
        
        <Navbar/>
        <MensClothing/>
    </div>
  )
}
