import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from '../../Utils/baseUrl.js';
import { storeContext } from '../Context/CartContext.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
    let {userOrders}= useContext(storeContext)
 

    const [my_Orders, setmy_Orders] = useState(null)
    const [bol , setbol] = useState(1)
     let userData = localStorage.getItem("userData")
     userData=(JSON.parse(userData));

  async  function getAllOrder()
    {
     let response = await userOrders()
     console.log({response:response.data});
     setmy_Orders(response.data)
   
    }

    useEffect(()=>{
        if(bol==1)
        {
            getAllOrder()
            setbol(0)

        }
    },[my_Orders])
  return (<>
  
  {my_Orders? <div className='container my-4 py-3 bg-main-light navbar-light'>
        <h2 className='text-main  text-center my-3 py-4 '> Hello , {userData.name} This is Your Orders</h2>
        <div className="row">
           {
           my_Orders?.map((ele,index)=>{
            return <div key={index} className="col-md-6 px-3">
                 <p className='text-muted py-2' >This order was delivered to <span className='text-main px-1'>{ele.shippingAddress.details}</span>  in <span className='text-main px-1'>{ele.shippingAddress.city}</span>
                    with this number: <span className='text-main px-1'>{ele.shippingAddress.phone}</span>
                </p>
             
            
             
             <div className="container mt-3 py-3">
             <h4 className='text-muted py-2'>Order Total Price : <span className='text-main'>{ele.totalOrderPrice}</span></h4>


            <div className="row">
                {ele.cartItems.map((item,index)=>{
                    return <div key={index} className="col-md-10 px-5">
                        <img src={item.product.imageCover} className='img-fluid my-3' alt={item.product.title} />
                        <h5 className='text-muted my-2'>Product Name :<span className='text-main'>{item.product.title}</span> </h5>
                        
                         <h5 className='text-muted my-2'>Count : <span className='text-main'>{item.count}</span></h5>
                            <h5 className='text-muted my-2'>Price : <span className='text-main'>{item.price}EGP</span></h5>
                            <h5 className='text-muted my-2'>Brand Name :<span className='text-main'>{item.product.brand.name}</span> </h5>
                           <h5 className='text-muted my-2'> Category Name :<span className='text-main'>{item.product.category.name}</span> </h5>
                            <h5 className='text-muted my-2'>PaymentType : <span className='text-main'>{ele.paymentMethodType}</span></h5>



                    </div>
                })}
            </div>
           </div>

            </div>

           })
           }
          
        </div>

        
    <div className='d-flex justify-content-end  p-4'>
        {/* <button  className='text-white bg-main p-2  border border-none'>Go To Home</button> */}
        {my_Orders.length !=0? <Link to="/" className='btn btn-border bg-main text-white float-end'>Go To Home</Link>:""}

    </div>
    </div> :""}

  
  </>
 
  )
}
