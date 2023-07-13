import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { baseUrl } from '../../Utils/baseUrl.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Register() {
    const notify = ({msg,type}) =>{ 
        toast[type](msg)
    };
    let navigate =useNavigate()
    let [loading, setLoading] = useState(false)
    let validate =(values)=>{
        let errors ={}

        if(!values.name){
            errors.name ="userName is required"
        }else if (values.name.length < 3 ){
            errors.name ="too short name "
        }else if(values.name.length > 15){
            errors.name ="must be 15 characters or less"

        }

        if (!values.email) {
            errors.email = 'email is required ';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email ';
          }

        if (!values.password) {
            errors.password = 'password is required ';
          } else if (!/^[a-zA-Z0-9@]{3,30}$/i.test(values.password)) {
            errors.password = 'invalid password ';
          }
        if (!values.rePassword) {
            errors.rePassword = 'confirm password is required ';
          } else if (values.rePassword !== values.password) {
            errors.rePassword = 'password  and confirm password  not match';
          }
          if(!values.phone){
            errors.phone ="phone is required"
        }else if (values.phone.length < 11 ){
            errors.phone ="must be 11 number "
        }else if(values.phone.length > 11){
            errors.phone ="must be 11 number"

        }

          return errors

    }

    let registerFormik = useFormik({
        initialValues: {
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
          },
          validate
          ,
          onSubmit: (values) => {
           //console.log(values)
           setLoading(true)
             axios.post(`${baseUrl}/auth/signup`,values).then(data=>{
                if(data.status === 201)
                {
                    notify({msg:'Success',type:'success'})
                    navigate("/login")
                }
            //console.log(data)
           }).catch(err=>{
            if(err.response.status ===  400)
            {
                notify({msg:err.response.data.message , type:'error'})
                setLoading(false)
               
            }else if(err.response.status ===  409)
            {
                notify({msg:err.response.data.message , type:'error'})
                setLoading(false)
              
            }
            //console.log(err);
           })
          },
    }) 
  
  return (
    <>
   
    <div className='w-75 m-auto mt-4'>
        <h2 className='text-center'>Registration Now </h2>
        <form action="" onSubmit={registerFormik.handleSubmit} >
            <label htmlFor="name" className='fw-bolder mt-2'>Name</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.name} onChange={registerFormik.handleChange} type="text" className='form-control my-2' id="name" name="name" />
            
            {registerFormik.errors?.name && registerFormik.touched.name ?<div className="alert alert-danger">{registerFormik.errors?.name}</div>:null}
            <label htmlFor="email" className='fw-bolder'>Email</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} type="email" className='form-control my-2' id="email" name="email" />
            {registerFormik.errors?.email && registerFormik.touched.email ?<div className="alert alert-danger">{registerFormik.errors?.email}</div>:null}
            <label htmlFor="password" className='fw-bolder'>Password</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} type="password" className='form-control my-2' id="password" name="password" />
            {registerFormik.errors?.password && registerFormik.touched.password ? <div className="alert alert-danger">{registerFormik.errors?.password}</div> :null}
            <label htmlFor="rePassword" className='fw-bolder'>Confirm Password</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} type="password" className='form-control my-2' id="rePassword" name="rePassword" />
            {registerFormik.errors.rePassword && registerFormik.touched.rePassword ?<div className="alert alert-danger">{registerFormik.errors?.rePassword}</div> :null }
            <label htmlFor="phone" className='fw-bolder'>phone</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.phone} onChange={registerFormik.handleChange} type="text" className='form-control my-2' id="phone" name="phone" />
            {registerFormik.errors.phone && registerFormik.touched.phone ?<div className="alert alert-danger">{registerFormik.errors?.phone}</div> :null }
            <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} type='submit' className='btn bg-main text-white w-100 mt-2'>
                {!loading? "Register": <i className='fas fa-spinner fa-spin '></i>}
                </button>
                <p className='text-muted small_font mt-3  text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                        <hr className='mt-1 w-50 m-auto' />
                        <p className=' text-center '>Already have an account? <NavLink to='/login' ><span className='text-main'>Log in</span></NavLink></p>
        </form>
    </div>
    </>
  )
}
