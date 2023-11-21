'use client'
import React from 'react'
import Navbar from '../components/navbar'
import WomansClothing from '../components/womansclothing'
import LoginLogout from '../components/login-logout'

export default function page() {
  return (
    <div>
        <LoginLogout/>
        <Navbar/>
        <WomansClothing/>
    </div>
  )
}
