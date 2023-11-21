'use client'
import React from 'react'
import Navbar from '../components/navbar'
import Electronics from '../components/electronics'
import LoginLogout from '../components/login-logout'

export default function page() {
  return (
    <div>
      <LoginLogout/>
        <Navbar/>
        <Electronics/>
    </div>
  )
}
