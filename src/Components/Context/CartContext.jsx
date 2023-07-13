import axios from "axios";
import React, { useEffect, useState } from "react";

import { createContext} from "react";
import { baseUrl } from "../../Utils/baseUrl.js";




export let storeContext = createContext(0)

export default function StoreContextProvider({children})
{
    
   const [count, setCount] = useState(0)
   const [dataWish, setWishData] = useState([])




    function addToCart(token , productId){

       return  axios.post(`${baseUrl}/cart`,{productId},{headers:{token}})
        .then(data=>data)
        .catch(err=>err)

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


   
   

     
    

 
    useEffect(()=>{
       
        let token= localStorage.getItem("token")
        getCartCount (token)
      
      
    },[])
    return  <storeContext.Provider value={{addToCart ,getUserCart,removeCartItem,updatequantity,getCartCount,
    count,getUserWishList ,addToWishList,removeWishListItem,dataWish  }}>
        {children}
    </storeContext.Provider>

}