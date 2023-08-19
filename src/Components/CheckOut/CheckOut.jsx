import { useFormik } from 'formik'
import React from 'react'
import { useContext } from 'react';
import { storeContext } from '../Context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckOut() {
  let {cartId,onlinePayment,cashPayment} = useContext(storeContext)
  let navigate = useNavigate()

  console.log({cartId});
  async function handleSubmit(values)
  {
    console.log("ttttttttttttttttttttttt");
    console.log({values});
    console.log(values.paymentType);

    if(values.paymentType =="COD")
    {
      let response = await cashPayment(cartId,values)
      if(response?.data?.status === 'success')
      {
        navigate("/allorders")
      }
    }
    else 
    {
      let response = await onlinePayment(cartId,values)
      if(response?.data?.status === 'success')
      {
        console.log({URL:response.data.url});
        window.location.href=response.data.session.url;
        console.log({response});
      }
    }

   
  }
    let checkoutFormik =useFormik({
        initialValues: {
            details:'',
            phone:'',
            city:'',
            
          },
          onSubmit:handleSubmit
    })
  return (
    <>
    <div className="d-flex justify-content-center align-item-center bg-main-light vh-100">
    <div className=" w-50 m-auto py-5  my-5">
        <form onSubmit={checkoutFormik.handleSubmit}>

            <label htmlFor="details">address details</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} value={checkoutFormik.values.details} type="text" name='details' id='details' className='form-control my-3' />
   
            <label htmlFor="phone">phone</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} value={checkoutFormik.values.phone} type="text" name='phone' id='phone' className='form-control my-3' />
   
            <label htmlFor="city">City</label>
            <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} value={checkoutFormik.values.city} type="text" name='city' id='city' className='form-control my-3' />
            <div className="d-flex   align-items-center my-5">
              <label className="me-5">Payment Type</label>
              <div className="d-flex justify-content-center align-items-center ">
                
                <div className="form-check form-check-inline mx-5">
                  <input
                    onChange={checkoutFormik.handleChange}
                    type="radio"
                    name="paymentType"
                    id="COD"
                    value="COD"
                    className="mx-2"
                  />
                   <i className="fa-solid fa-sack-dollar"></i> Cash
                  <br />
                </div>
                <div className="form-check form-check-inline ">
                  <input
                    onChange={checkoutFormik.handleChange}
                    type="radio"
                    name="paymentType"
                    id="Card"
                    value="Card"
                    className="mx-2"
                  />
                  <i class="fa-brands fa-cc-visa"></i> Card
                  <br />
                </div>

              </div>
            </div>

            <button className='btn bg-main text-white w-100 mt-3'>PLACE ORDER</button>
        </form>
    </div>
    </div>
    </>
  )
}
