'use client'
import React from 'react'
import Jewelery from '../components/jewelery'
import Navbar from '../components/navbar'
import LoginLogout from '../components/login-logout'

export default function page() {
  return (
    <div>
      <LoginLogout/>
        
        <Navbar/>
        <Jewelery/>
    </div>
  )
}
