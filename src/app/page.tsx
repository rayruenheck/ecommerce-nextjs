'use client'
import { handleLogout } from "./components/logout";
import { useEffect, useState } from "react"
import AllItems from "./components/allitems";
import WomansClothing from "./components/womansclothing";
import Navbar from "./components/navbar";


export default function Home() {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      const usertoken = localStorage.getItem('usertoken');
      setlogoutClassName(usertoken ? 'text-3x1' : 'hidden')
      setloginclassName(usertoken ? 'hidden' : 'text-3x1')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      const usertoken = localStorage.getItem('usertoken');
      const username = localStorage.getItem('username')
      setUsername(username ? username : '')
      setwelcomeClassName(usertoken ? 'text-3x1' : 'hidden')
    }
  }, [])

  const [logoutclassName, setlogoutClassName] = useState('hidden')
  const [loginclassName, setloginclassName] =useState('hidden')
  const [welcomeclassName, setwelcomeClassName] = useState('hidden')
  const [username, setUsername] = useState('')
  
  
  return (
    <main className="h-[100vh]">
    <Navbar/>

      
      <div className={welcomeclassName}>Welcome Back {username.charAt(0).toUpperCase() + username.slice(1)}!</div>
      <div>
        <a onClick={handleLogout} href="" className={logoutclassName}>Logout</a>
        <a  href="/login" className={loginclassName}>Login</a>

      </div>
      <div>home</div>
      <AllItems/>
    </main>
  )
}
