import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utils/baseUrl.js';
import Slider from 'react-slick';
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx';
import { storeContext } from '../Context/CartContext.jsx';
import { useContext } from 'react';
import { notify } from '../../Utils/notify.js';

export default function ProductDetails() {
  const [wishlist, setWishList] = useState([]);

    let {productId} = useParams()
   let {getCartCount,addToCart ,addToWishList,removeWishListItem,getUserWishList }= useContext(storeContext);

   const [bol , setbol] = useState(1)
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
     
    //console.log(productId);
 const [product, setProduct] = useState([])
 const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={product.images[i] } className="img-fluid"  alt="" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

 const getProduct = async ()=>{
    let {data} = await axios.get(`${baseUrl}/products/${productId}`)
    setProduct(data.data)
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

 useEffect(()=>{
  getProduct()
  if(bol==1) {
   getWhisList()
   setbol(0)

  }
  
},[wishlist])


  return (
   <>
   {product.length != 0 ?  <div className="container mt-5">
        <div className="row mt-5">
            {/* <div className="col-md-6">
                <img src={product.imageCover} className='img-fluid' alt="" />
            </div> */}
            <div className='col-md-6 mt-5 '>
            <Slider {...settings}>
            {product.images?.map((item)=>{
        return <img src={item} className=' w-100' height={550}  alt=""  />
      })}
        </Slider>
            </div>

            <div className="col-md-6 mt-5 py-5 d-flex justify-content-between align-items-center ">
                <div className='mt-5 product py-5'>
                    <div className='d-flex justify-content-between align-items-center '>
                        <h3 className='my-2'>{product.title}</h3> 
                        {wishlist.some(obj => obj._id === product._id)?<i onClick={()=>{deleteitem(product._id) }} className="fa-solid fa-heart text-danger"></i> : <i onClick={()=>{addProductWishList(product._id)}} className="fa-regular fa-heart "></i> }


                    </div>
                    <p className='my-2'>{product.description}</p>
                    <h6 className='text-main my-2'>{product.category?.name}</h6>
                    <h6 className='text-main my-2'>{product.brand?.name}</h6>
                        <div className='d-flex justify-content-between align-items-center my-3'>

                        <span>{product.price} EGP</span>
                            <div >
                            <i className='fas fa-star rating-color'></i>
                            <span>{product.ratingsAverage}</span>
                            </div>
                        </div>
                           
                   
                        <button onClick={()=>{addProduct(product._id)}} className='btn bg-main text-white w-100'>Add To Cart</button>
                    
                </div>
            </div>
        </div>
    </div>  :<ProjectLoading/>} </>
   
  )
}
