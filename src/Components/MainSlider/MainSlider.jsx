import React from 'react'
import Slider from "react-slick";
import  image1 from "../../images/imagesSlider/slider-image-1.jpeg"
import  image2 from "../../images/imagesSlider/slider-image-2.jpeg"
import  image3 from "../../images/imagesSlider/slider-image-3.jpeg"
import  image4 from "../../images/imagesSlider/slider-2.jpeg"
import  image5 from "../../images/imagesSlider/grocery-banner.png"
import  image6 from "../../images/imagesSlider/grocery-banner-2.jpeg"
//----------------------------------------------------------
import img1 from "../../images/imgDiscount/Amazon-com-Discover-Offers-Credit-Payment-Cards.webp"
import img2 from "../../images/imgDiscount/discount-e1562080276501.webp"
import img3 from "../../images/imgDiscount/discount1.jpg"
import img4 from "../../images/imgDiscount/discount3.jpg"


export default function MainSlider() {

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

  // const settings2 = {
  //  // dots: true,
  //   infinite: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 2000,
  //   autoplaySpeed: 2000,
  //   cssEase: "linear"
  // };
  return (
    <>
   {/* <div className='my-5 '>
   <Slider  {...settings2} >
      
       <img src={img1} className='w-100 ' height={200} alt=""  />
       <img src={img2} className='w-100 ' height={200} alt=""  />
       <img src={img3} className='w-100 ' height={200} alt=""  />
       <img src={img4}  className='w-100 ' height={200} alt=""  />
       <img src={img1}  className='w-100 ' height={200} alt=""  />
       <img src={img4} className='w-100 ' height={200} alt=""  />
   
   </Slider>
   </div> */}

   <div className='my-5 '>
   <Slider  {...settings} >
      
       <img src={image1} className='w-100 ' height={200} alt=""  />
       <img src={image2} className='w-100 ' height={200} alt=""  />
       <img src={image3} className='w-100 ' height={200} alt=""  />
       <img src={image4}  className='w-100 ' height={200} alt=""  />
       <img src={image5}  className='w-100 ' height={200} alt=""  />
       <img src={image6} className='w-100 ' height={200} alt=""  />
   
   </Slider>
   </div>


    </>
  )
}
