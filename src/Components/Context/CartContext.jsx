import axios from "axios";
import React, { useEffect, useState } from "react";

import { createContext} from "react";
import { baseUrl } from "../../Utils/baseUrl.js";




export let storeContext = createContext(0)

export default function StoreContextProvider({children})
{
    
   const [count, setCount] = useState(0)
   const [dataWish, setWishData] = useState([])
   const [cartId,setCartId]=useState(null)
  




    function addToCart(token , productId){

       return  axios.post(`${baseUrl}/cart`,{productId},{headers:{token}})
        .then(data=>data)
        .catch(err=>err)

    }
    
    function onlinePayment(cartId,shippingAddress)
    {
        let token = localStorage.getItem("token")
        if(token)
        {
            
            return axios.post(`${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress},{headers:{token}})
            .then(data=>data)
            .catch(err=>err)
        }
    }
    function cashPayment(cartId,shippingAddress)
    {
        let token = localStorage.getItem("token")
        if(token)
        {
            setCount(0)
            return axios.post(`${baseUrl}/orders/${cartId}`,{shippingAddress},{headers:{token}})
            .then(data=>data)
            .catch(err=>err)
        }
    }
  

   
    function getUserCart(token ){

       return  axios.get(`${baseUrl}/cart`,{headers:{token}})
        .then(data=>data)
        .catch(err=>err)

    }
    function removeCartItem(token,productId ){

       return  axios.delete(`${baseUrl}/cart/${productId}`,{headers:{token}})
        .then(data=>data)
        .catch(err=>err)

    }
    function updatequantity(token,productId,count ){
      

       return  axios.put(`${baseUrl}/cart/${productId}`,{count},{headers:{token}})
        .then(data=>data)
        .catch(err=>err)

    }

    function getCartCount (token)
    {
          axios.get(`${baseUrl}/cart`,{headers:{token}})
        .then(data=>{
            setCount(data.data.numOfCartItems)
            setCartId(data.data.data._id)
            console.log({cartId:data.data.data._id});
        })
        .catch(err=>{
            //console.log(err)
        })

     
    }
    function addToWishList(token , productId){
         setWishData(productId)
    
        return  axios.post(`${baseUrl}/wishlist`,{productId},{headers:{token}})
         .then(data=>data)
         .catch(err=>err)
 
     }
     function getUserWishList(token ){
            
        return   axios.get(`${baseUrl}/wishlist`,{headers:{token}})
         .then(data=>data)
         .catch(err=>err)
        
 
     }

     function removeWishListItem(token,productId ){

        return   axios.delete(`${baseUrl}/wishlist/${productId}`,{headers:{token}})
         .then(data=>data)
         .catch(err=>err)
 
     }

     function userOrders (){
        let userData = localStorage.getItem("userData")
        let token= localStorage.getItem('token')
         userData =(JSON.parse(userData))
        console.log(userData);
         return axios.get(`${baseUrl}/orders/user/${userData?.id}`,{headers:{token}}).then(data=>data).catch(err=>err)
     }


   
   

     
    

 
    useEffect(()=>{
       
        let token= localStorage.getItem("token")
        getCartCount (token)
      
      
    },[])
    return  <storeContext.Provider value={{addToCart ,getUserCart,removeCartItem,updatequantity,getCartCount,onlinePayment,cartId,userOrders,cashPayment
    ,count,getUserWishList ,addToWishList,removeWishListItem,dataWish  }}>
        {children}
    </storeContext.Provider>

}