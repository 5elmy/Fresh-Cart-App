import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context/CartContext.jsx'
import { notify } from '../../Utils/notify.js'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx'
import { nanoid } from 'nanoid'


export default function WishList() {
 let {getUserWishList}= useContext(storeContext)
 let {addToCart,getCartCount ,removeWishListItem }= useContext(storeContext)

  const [whishData, setwhishData] = useState([])

  async function addProduct(productId){
    let token = localStorage.getItem("token");
    if(token)
    {
        let response =  await addToCart(token , productId)
        //console.log({response});
     
        if (response.status === 200)
        {
         getCartCount(token)
         notify({msg:'Product added successfully',type:'success'})
        }
    }
  

    }

  async function getWhisList()
  {
    let token = localStorage.getItem("token")
    if(token)
    {
      let response = await getUserWishList(token)
     console.log(response.data.data);
     setwhishData(response.data?.data)
     
      //setWishProduct(response.data.data?.products)

    }
  }
  console.log({whishData});

  async function deleteitem (productId)
  {
    let token = localStorage.getItem("token")
    if(token)
    {
      let response = await removeWishListItem(token ,productId)
     // //console.log({response});
      setwhishData(response.data.data)
    }
  }

  useEffect(() => {
    getWhisList()
    },[whishData])
  return (<>
     {whishData?.length !=0 ?  <>
    <div  className="container bg-main-light mt-5 py-5">
                
      <h2 className='text-center text-main mb-5'>My WishList <i className="fa-solid fa-heart text-danger"></i> </h2>
      <div className="row">

        {whishData?.map((item)=>{
         
          return  <div key={nanoid()} className='col-md-3 mt-2 product'>
            <img src={item.imageCover} className='img-fluid' alt="" />
            <h6 className='text-main mx-2 mt-2'>{item.brand?.name}</h6>
            <div className='d-flex justify-content-between align-item-center mx-2'>
                <p className='fw-bolder'>{item.title?.split(" ").slice(0,6).join(" ")}</p>                                  
                <i onClick={()=>{deleteitem(item._id) }} className="fa-solid fa-heart text-danger"></i>
            </div>

            <div className='d-flex mx-2 justify-content-between align-item center my-4'>
               <span className='text-main'>{item.price} EGP</span>
               <div>
                  <i  className='fas fa-star rating-color'></i>
                  <span>{item.ratingsAverage}</span>
                </div>
             </div>

             <button onClick={()=>{addProduct(item._id) }} className='btn bg-main text-white w-100'>Add To Cart</button>


          </div>
        }) }


      </div>
    </div>
    </>: !whishData.length ?  <ProjectLoading/> : <div className='d-flex justify-content-center align-content-center vh-100'><h3>WhishList is empty</h3></div>}
  </>
   
  )
}
