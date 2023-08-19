import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { storeContext } from '../Context/CartContext.jsx';
import { notify } from '../../Utils/notify.js';
import axios from 'axios';
import { baseUrl } from '../../Utils/baseUrl.js';


export default function Product({products}) {
   let {addToCart,getCartCount ,addToWishList,removeWishListItem,getUserWishList }= useContext(storeContext);
//    const [IsWishListActive, setIsWishListActive] = useState(false);
   const [wishlist, setWishList] = useState([]);
   const [bol , setbol] = useState(1)

// console.log({wishlist});
 async function getWhisList()
 {
   let token = localStorage.getItem("token")
   if(token)
   {
     let response = await getUserWishList(token)
   localStorage.setItem("wishlist",JSON.stringify(response.data.data))

  //console.log({response});
    setWishList(response.data?.data)
    console.log({getWhisList:wishlist}); 
     

   }
 }
 async function addProductWishList(productId ){
  
  let token = localStorage.getItem("token");
  console.log({num:1});
  if(token)
  {  
  console.log({num1:2});

      let response =  await addToWishList(token , productId)
      console.log({response});
      console.log({WishList:response.data.data});  
      setWishList(response.data.data)   
      setbol(1)

      if (response.status === 200)
      {  
       getCartCount(token)
       notify({msg:'Product added successfully to your wishlist',type:'success'})
      }
  }
  }

   async function addProduct(productId){
    let token = localStorage.getItem("token");
    if(token)
    {
        let response =  await addToCart(token , productId)
        //console.log({response});
         
        if (response.status === 200)
        {
         getCartCount(token)
         notify({msg:'Product added to cart successfully',type:'success'})
        }

    }
    }
    async function deleteitem (productId)
    {
      let token = localStorage.getItem("token")
      if(token)
      {
        let response = await removeWishListItem(token ,productId)
       // //console.log({response});
       setWishList(response.data.data)
       setbol(1)
      }
    }

    useEffect(()=>{
      if(bol==1) {
       getWhisList()
       setbol(0)

      }
      
    },[wishlist])
    // wishlist
  return (
    <>

    {
        products.map((item)=>{
            return <div key={item._id} className="col-md-3 mt-3">
                <div className='product'>
                       <Link to={`/product-details/${item._id}`}>
                       <img src={item.imageCover} className='w-100'    alt="" />
                       </Link>
                       <h6 className='text-main mx-2 mt-2'>{item.brand?.name}</h6>
                       <div className='d-flex justify-content-between align-items-center mx-2'>
                       <p className='fw-bolder'>{item.title.split(" ").slice(0,10).join(" ")}</p>
                            

                         {/* <button className='border-0 bg-transparent' onClick={()=>{ wishlist?.includes(item._id) ? deleteitem(item._id) : addProductWishList(item._id )  }}> */}
                         
                         {/* {wishlist?.includes(item._id) ? <i  className='fa-solid fa-heart text-danger'></i> :<i className='fa-regular fa-heart'></i>
                         } */} 
                       {wishlist.some(obj => obj._id === item._id)?<i onClick={()=>{deleteitem(item._id) }} className="fa-solid fa-heart text-danger"></i> : <i onClick={()=>{addProductWishList(item._id)}} className="fa-regular fa-heart "></i> }
                           
                         {/* </button> */}
                       </div>
                        
                        <div className='d-flex mx-2 justify-content-between align-item center my-4'>
                            <span>{item.price} EGP</span>
                            <div>
                            <i  className='fas fa-star rating-color'></i>
                            <span>{item.ratingsAverage}</span>
                            </div>
                        </div>

                    
                         <button onClick={()=>{addProduct(item._id)}} className='btn bg-main text-white w-100'>Add To Cart</button>
                </div>
            </div>
        })
    }
    </>
  )
}
