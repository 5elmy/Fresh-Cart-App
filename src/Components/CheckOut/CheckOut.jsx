import { useFormik } from 'formik'
import React from 'react'

export default function CheckOut() {
    let checkoutFormik =useFormik({
        initialValues: {
            details:'',
            phone:'',
            city:'',
            
          },
          onSubmit:(values)=>{

          }
    })
  return (
    <>
    <div className="d-flex justify-content-center align-item-center bg-main-light vh-100">
    <div className=" w-50 m-auto py-5  my-5">
        <form onSubmit={checkoutFormik.handleSubmit}>

            <label htmlFor="details">Details</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='details' id='details' className='form-control my-3' />
   
            <label htmlFor="phone">phone</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='phone' id='phone' className='form-control my-3' />
   
            <label htmlFor="city">City</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='city' id='city' className='form-control my-3' />

            <button className='btn bg-main text-white w-100 mt-3'>PLACE ORDER</button>
        </form>
    </div>
    </div>
    </>
  )
}
