import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from './Auth'

const SecuredRoute = () => {
  return (
    isLoggedIn() ? <Outlet /> : <Navigate to='/about' />
  )
}

export default SecuredRoute
