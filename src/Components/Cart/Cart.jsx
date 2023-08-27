import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context/CartContext.jsx'
import { notify } from '../../Utils/notify.js'
import { Link } from 'react-router-dom'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx'


export default function Cart() {
  let {getUserCart, removeCartItem,updatequantity,getCartCount } =  useContext(storeContext)
 let {count } =   useContext(storeContext)

  let [cart , setCart]= useState([])
  let [price , setPrice]= useState([])
  
  async function getCart()
  {
    let token = localStorage.getItem("token")
    if(token)
    {
      let response = await getUserCart(token)
      //console.log(response);
      setCart(response.data.data.products)
      setPrice(response.data.data.totalCartPrice)

    }

  }
  async function removeSelectedItemFromCart(productId)
  {
    let token = localStorage.getItem("token")
    if(token)
    {
      let response = await   removeCartItem(token,productId)
      //console.log(response);
      setCart(response.data.data.products)
      setPrice(response.data.data.totalCartPrice)
      notify({msg:'Product deleted' ,type:'success'})
      getCartCount(token)
    }
  
  }

  async function updateQuantityinCart(productId,count)
  {
    //console.log({count});
 
   
    let token = localStorage.getItem("token")
    if(token)
    {
      let response = await updatequantity(token,productId,count)
      //console.log(response);
      setCart(response.data.data.products)
      setPrice(response.data.data.totalCartPrice)
      if(count > 1) notify({msg:'Product updated' ,type:'success'})
    }

  }


  useEffect(() => {
    getCart()
    }, [])
  
  return (
    <>       
        {count!=0 ? <> {cart.length !=0? <div className='container w-75 mt-5 bg-main-light py-5'>
            <div className='bg-main-light my-4 p-3 '>
                <h3 className='fw-bolder'>Shop Cart</h3>
                <h6 className='text-main my-4 '><span className='fw-bolder'>Total Cart price :</span> {price}  EGP</h6>

                  {cart.map((item)=>{
                    return <div key={item._id} className="row  border-bottom my-3">
                      <div className="col-md-1 mt-4">
                        <img src={item.product.imageCover} className='w-100' alt="" />
                      </div>
                      <div className="col-md-11 mt-4 d-flex justify-content-between align-item-center ">
                        <div>    
                        <h6 className='fw-bolder'>{item.product.title}</h6>
                        <h6 className='text-main mx-2'>{item.price} EGP</h6>
                        <button onClick={()=>{removeSelectedItemFromCart(item.product._id)}} className='text-danger border-0'><span>Remove</span> <i className='fa-solid fa-trash'></i> </button>
                        </div>
                        <div>
                          <button onClick={()=>{updateQuantityinCart(item.product._id,item.count+1)}} className='btn btn-border '>+</button>
                          <span className='mx-2'>{item.count}</span>
                          <button onClick={()=>{
                             {item.count-1 >1 ?  updateQuantityinCart(item.product._id,item.count-1) : updateQuantityinCart(item.product._id,1)}
                            
                            }} className='btn btn-border '>-</button>
                        </div>



                      </div>

                    </div>

                    
                  })}
                {cart.length !=0? <Link to="/checkout" className='btn btn-border bg-main text-white float-end'>Check Out</Link>:""}
                

                </div> 

        </div>  : <ProjectLoading/> } </> : <div className='container my-5 py-3 w-50 m-auto vh-100
         bg-main-light d-flex justify-content-center align-items-center'>
        <div><h1 className='text-main text-center '> Cart is Empty.Added Product , If you Want </h1></div>
        
       </div>} 

        {/* */}

        {/*   </> :<>   <div className='container mt-5 py-5 w-50 m-auto vh-100 bg-main-light d-flex justify-content-center align-items-center'>
    <div><h1 className='text-main text-center '> Cart is Empty,Added Product</h1></div>
    
   </div></> } */}

                


    </>
  )
}
