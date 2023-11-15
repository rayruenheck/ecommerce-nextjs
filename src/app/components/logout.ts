export const handleLogout = () => {
    localStorage.removeItem('usertoken')
    localStorage.removeItem('id')
  }
