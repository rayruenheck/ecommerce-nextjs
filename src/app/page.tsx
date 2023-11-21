'use client'

import { useEffect, useState } from "react"
import AllItems from "./components/allitems";
import WomansClothing from "./components/womansclothing";
import Navbar from "./components/navbar";
import LoginLogout from "./components/login-logout";


export default function Home() {
  const [welcomeClassName, setWelcomeClassName] = useState('hidden');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usertoken = localStorage.getItem('usertoken');
      const username = localStorage.getItem('username');
      setUsername(username ? username : '');
      setWelcomeClassName(usertoken ? 'block' : 'hidden');
    }
  }, []);

  

  return (
    <>
    <LoginLogout/>
    <main className="min-h-screen  p-4">
      
      <Navbar />

      <div className={`text-3xl font-bold text-center mt-8 ${welcomeClassName}`}>
        Welcome Back, {username.charAt(0).toUpperCase() + username.slice(1)}!
      </div>

      

      <div className="text-3xl font-bold mt-8 text-center">Discover Amazing Products</div>

      <AllItems />
    </main>
    </>
  );
}