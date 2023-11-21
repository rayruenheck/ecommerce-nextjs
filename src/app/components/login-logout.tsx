import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function LoginLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usertoken = localStorage.getItem('usertoken');
      setIsLoggedIn(!!usertoken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('id');
    setIsLoggedIn(false)
    router.push('/login')

  };

  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      {isLoggedIn ? (
        <>
          <div className="border-r-2 pr-2">
            <button onClick={handleLogout} className="text-blue-500">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="border-r-2 pr-2">
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </div>
          <div className="border-r-2 pr-2">
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </div>
        </>
      )}
    </div>
  );
}