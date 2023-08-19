import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import MainLayOut from './LayOuts/MainLayOut.jsx'
import HomePages from './Pages/HomePage.jsx'
import Products from './Components/Products/Products.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import StoreContextProvider from './Components/Context/CartContext.jsx';
import Cart from './Components/Cart/Cart.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import WishList from './Components/WishList/WishList.jsx';
import AuthContextProvider, { authContext } from './Components/Context/AuthContext.jsx';
import Brand from './Components/Brands/Brand.jsx';
import Error from './Components/Error/Error.jsx';
import Categories from './Components/Categories/Categories.jsx';
import ProtectedRoute from './Components/ProductRoute/ProductRoute.jsx';
import Disconnected from './Components/DisConnected/Disconnected.jsx';
import { Offline } from 'react-detect-offline';
import ProjectLoading from './Components/ProjectLoading/ProjectLoading.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import Orders from './Components/Orders/Orders.jsx';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [userData1, setUserData1] = useState(null);
  function saveUserData()
  {
  let encodedToken=localStorage.getItem('token');
  let decodedToken=jwtDecode(encodedToken);
  setUserData1(decodedToken);
  localStorage.setItem('userData',JSON.stringify( decodedToken))

  console.log(decodedToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token') !== null && userData== null)
    {
      saveUserData();
    }
  }, [])
  let {userData} = useContext(authContext)
  let routes = createBrowserRouter([
    {
      path:"",
      element:<AuthContextProvider><MainLayOut/></AuthContextProvider> ,
      children:[
        {index:true , element:<HomePages/>},
        {path:"home" , element:<HomePages/>},
        {path:"products" , element:<Products/>},
        {path:"product-details/:productId" , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:"register" , element:<Register/>},
        {path:"login" , element: <AuthContextProvider><Login/></AuthContextProvider>} ,
        {path:"cart" , element:<ProtectedRoute userData={userData}><Cart/></ProtectedRoute>},
        {path:"checkout" , element:<ProtectedRoute userData={userData}><CheckOut/></ProtectedRoute>},
        {path:"wishlist" , element:<ProtectedRoute userData={userData}><WishList/></ProtectedRoute>},
        {path:"brands" , element:<Brand/>},
        {path:"categories" , element:<Categories/>},
        {path:"allorders" , element:<Orders/>},
        {path:"load" , element:<ProjectLoading/>},
        {path:"forgetPassword" , element:<ForgetPassword/>},
        {path:"reset-password" , element:<ResetPassword/>},
        {path:"*" , element:<Error/>},
      ]
    }
  ])
  return (
    <>
      <Offline><Disconnected/></Offline>
    <ToastContainer theme='colored' />
  
    
   <StoreContextProvider>
    <RouterProvider router={routes} />
      
   </StoreContextProvider>
  
    </>
  )
}
