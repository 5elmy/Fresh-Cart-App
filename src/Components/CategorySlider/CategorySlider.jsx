import React, { useEffect, useState } from 'react'
import axios from "axios"
import Slider from "react-slick";
import { baseUrl } from '../../Utils/baseUrl.js'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx';

export default function CategorySlider() {
 const [categories, setCategories] = useState([])
  const getAllCategories = async()=>{
    let {data} = await axios.get(`${baseUrl}/categories`)
    //console.log({data:data.data})
    setCategories(data.data)
    //console.log({categories});
  }
  const settings = {
   // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  useEffect(()=>{
    getAllCategories()
  },[]) 

  return (
    <>
   {categories.length !=0 ? <>
    <div className='my-5 container '>
    <h3> Shop Popular  Categories </h3>
   <Slider {...settings}>
      {categories?.map((item)=>{
        return <div key={item._id}> 
          <img src={item.image} className=' w-100' height={250} alt=""  />
          <h6 className='mx-3'>{item.name}</h6>
        
        </div>

      })}
    </Slider>
   </div>
    </> :<ProjectLoading/>}
    
    </>
  )
}
