import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utils/baseUrl.js';
import Slider from 'react-slick';
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx';

export default function ProductDetails() {
    let {productId} = useParams()
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
 useEffect(()=>{
    getProduct()
 },[])


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
                        <i  className="fa-regular fa-heart"></i>

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
                           
                   
                            <button className='btn bg-main text-white w-100 mt-3'>Add To Cart</button>
                    
                </div>
            </div>
        </div>
    </div>  :<ProjectLoading/>} </>
   
  )
}
