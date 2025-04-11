import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Cart from './Cart'

const Navbar = () => {

  return (
    <div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <p style={{backgroundColor:'green'}}>Website</p>
          <ul style={{display:'flex', gap:'40px', listStyle:'none', marginRight:'40px'}}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/cart">Cart</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
        </div>
        <div>
           <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/login' element={<Login />} />
             <Route path='/register' element={<Register />} />
             <Route path='/cart' element={<Cart />} />
           </Routes>
        </div>
    </div>
  )
}

export default Navbar