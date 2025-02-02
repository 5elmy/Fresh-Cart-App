// import React, { useContext } from 'react'
// import { ToastContainer } from 'react-toastify';
// import {RouterProvider , createBrowserRouter} from "react-router-dom"
// import MainLayOut from './LayOuts/MainLayOut.jsx'
// import HomePages from './Pages/HomePage.jsx'
// import Products from './Components/Products/Products.jsx'
// import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
// import Register from './Components/Register/Register.jsx'
// import Login from './Components/Login/Login.jsx'
// import StoreContextProvider from './Components/Context/CartContext.jsx';
// import Cart from './Components/Cart/Cart.jsx';
// import CheckOut from './Components/CheckOut/CheckOut.jsx';
// import WishList from './Components/WishList/WishList.jsx';
// import AuthContextProvider, { authContext } from './Components/Context/AuthContext.jsx';
// import Brand from './Components/Brands/Brand.jsx';
// import Error from './Components/Error/Error.jsx';
// import Categories from './Components/Categories/Categories.jsx';
// import ProtectedRoute from './Components/ProductRoute/ProductRoute.jsx';
// import Disconnected from './Components/DisConnected/Disconnected.jsx';
// import { Offline } from 'react-detect-offline';
// import ProjectLoading from './Components/ProjectLoading/ProjectLoading.jsx';
// import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
// import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
// import Orders from './Components/Orders/Orders.jsx';
// import jwtDecode from 'jwt-decode';
// import { useState } from 'react';
// import { useEffect } from 'react';

// export default function App() {
//   const [userData1, setUserData1] = useState(null);
//   function saveUserData()
//   {
//   let encodedToken=localStorage.getItem('token');
//   let decodedToken=jwtDecode(encodedToken);
//   setUserData1(decodedToken);
//   localStorage.setItem('userData',JSON.stringify( decodedToken))

//   console.log(decodedToken);
//   }

//   useEffect(() => {
//     if(localStorage.getItem('token') !== null && userData== null)
//     {
//       saveUserData();
//     }
//   }, [])
//   let {userData} = useContext(authContext)
//   let routes = createBrowserRouter([
//     {
//       path:"",
//       element:<AuthContextProvider><MainLayOut/></AuthContextProvider> ,
//       children:[
//         {index:true , element:<HomePages/>},
//         {path:"home" , element:<HomePages/>},
//         {path:"products" , element:<Products/>},
//         {path:"product-details/:productId" , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
//         {path:"register" , element:<Register/>},
//         {path:"login" , element: <AuthContextProvider><Login/></AuthContextProvider>} ,
//         {path:"cart" , element:<ProtectedRoute userData={userData}><Cart/></ProtectedRoute>},
//         {path:"checkout" , element:<ProtectedRoute userData={userData}><CheckOut/></ProtectedRoute>},
//         {path:"wishlist" , element:<ProtectedRoute userData={userData}><WishList/></ProtectedRoute>},
//         {path:"brands" , element:<Brand/>},
//         {path:"categories" , element:<Categories/>},
//         {path:"allorders" , element:<Orders/>},
//         {path:"load" , element:<ProjectLoading/>},
//         {path:"forgetPassword" , element:<ForgetPassword/>},
//         {path:"reset-password" , element:<ResetPassword/>},
//         {path:"*" , element:<Error/>},
//       ]
//     }
//   ])
//   return (
//     <>
//       <Offline><Disconnected/></Offline>
//     <ToastContainer theme='colored' />
  
    
//    <StoreContextProvider>
//     <RouterProvider router={routes} />
      
//    </StoreContextProvider>
  
//     </>
//   )
// }
import React, { useContext, useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StoreContextProvider from "./Components/Context/CartContext.jsx";
import AuthContextProvider, { authContext } from "./Components/Context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProductRoute/ProductRoute.jsx";
import { Offline } from "react-detect-offline";
import Disconnected from "./Components/DisConnected/Disconnected.jsx";
import jwtDecode from "jwt-decode";

// Lazy Load Components
const MainLayOut = lazy(() => import("./LayOuts/MainLayOut.jsx"));
const HomePages = lazy(() => import("./Pages/HomePage.jsx"));
const Products = lazy(() => import("./Components/Products/Products.jsx"));
const ProductDetails = lazy(() => import("./Components/ProductDetails/ProductDetails.jsx"));
const Register = lazy(() => import("./Components/Register/Register.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));
const Cart = lazy(() => import("./Components/Cart/Cart.jsx"));
const CheckOut = lazy(() => import("./Components/CheckOut/CheckOut.jsx"));
const WishList = lazy(() => import("./Components/WishList/WishList.jsx"));
const Brand = lazy(() => import("./Components/Brands/Brand.jsx"));
const Error = lazy(() => import("./Components/Error/Error.jsx"));
const Categories = lazy(() => import("./Components/Categories/Categories.jsx"));
const ProjectLoading = lazy(() => import("./Components/ProjectLoading/ProjectLoading.jsx"));
const ForgetPassword = lazy(() => import("./Components/ForgetPassword/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./Components/ResetPassword/ResetPassword.jsx"));
const Orders = lazy(() => import("./Components/Orders/Orders.jsx"));

export default function App() {
  const [userData1, setUserData1] = useState(null);
  const { userData } = useContext(authContext);

  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData1(decodedToken);
      localStorage.setItem("userData", JSON.stringify(decodedToken));
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null && userData == null) {
      saveUserData();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "",
      element: (
        <AuthContextProvider>
          <Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100 text-success"> <div><i className='fas fa-spinner fa-spin fa-1'></i></div> Loading Fresh Cart </div>}>
            <MainLayOut />
          </Suspense>
        </AuthContextProvider>
      ),
      children: [
        { index: true, element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><HomePages /></Suspense> },
        { path: "home", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><HomePages /></Suspense> },
        { path: "products", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Products /></Suspense> },
        { path: "product-details/:productId", element: <ProtectedRoute><Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><ProductDetails /></Suspense></ProtectedRoute> },
        { path: "register", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Register /></Suspense> },
        { path: "login", element: <AuthContextProvider><Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Login /></Suspense></AuthContextProvider> },
        { path: "cart", element: <ProtectedRoute userData={userData}><Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Cart /></Suspense></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute userData={userData}><Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><CheckOut /></Suspense></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute userData={userData}><Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><WishList /></Suspense></ProtectedRoute> },
        { path: "brands", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Brand /></Suspense> },
        { path: "categories", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Categories /></Suspense> },
        { path: "allorders", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Orders /></Suspense> },
        { path: "load", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><div className="d-flex justify-content-center align-item-center"> Loading </div></Suspense> },
        { path: "forgetPassword", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><ForgetPassword /></Suspense> },
        { path: "reset-password", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><ResetPassword /></Suspense> },
        { path: "*", element: <Suspense fallback={<div className="d-flex justify-content-center align-item-center"> Loading </div>}><Error /></Suspense> },
      ],
    },
  ]);

  return (
    <>
      <Offline>
        <Disconnected />
      </Offline>
      <ToastContainer theme="colored" />
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}
