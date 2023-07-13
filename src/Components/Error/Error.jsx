import React from 'react'
import image from '../../images/imagesSlider/error.svg'
export default function Error() {
  return (
    <div className='container py-5  my-5 d-flex justify-content-center align-items-center '>

        <div>
             <img src={image}   alt="" />
             <h2 className='text-main text-center mt-3'>Page Not Found</h2>

        </div>

    </div>
  )
}
