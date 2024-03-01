import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <nav>
        <Link to='/' className='p-1'>Home</Link>
        <Link to='/register' className='p-1'>Register</Link>
        <Link to='/login' className='p-1'>Login</Link>
   
    </nav>
  )
}


