import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ element: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default Protected