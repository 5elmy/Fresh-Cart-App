import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { baseUrl } from '../../Utils/baseUrl.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { notify } from '../../Utils/notify.js'
import { authContext } from '../Context/AuthContext.jsx'

export default function Login() {
  
    let navigate =useNavigate()
    // let { SaveUserData}= useContext(authContext)
    let [loading, setLoading] = useState(false)
    let validate =(values)=>{
        let errors ={}

        if (!values.email) {
            errors.email = 'email is required ';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email ';
          }

        if (!values.password) {
            errors.password = 'password is required ';

         

    }
    return errors

  }

    let registerFormik = useFormik({
        initialValues: {
  
            email:'',
            password:'',

          },
          validate
          ,
          onSubmit: (values) => {
           //console.log(values)
           setLoading(true)
             axios.post(`${baseUrl}/auth/signin`,values).then(data=>{
                if(data.status === 200)
                {
                  localStorage.setItem("token",data.data.token)
                    notify({msg:'Success',type:'success'})
                    navigate("/")
                    // SaveUserData()
                }
            //console.log(data)
           }).catch(err=>{
            if(err.response.status ===  401)
            {
                notify({msg:err.response.data.message , type:'error'})
                setLoading(false)
               
            }else if(err.response.status ===  400)
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
    <div className="container ">
      <div className="d-flex justify-content-center align-item-center">
      <div className='w-75 m-auto my-5'>
        <h2 className='text-center'>Login  Now </h2>
        <form action="" onSubmit={registerFormik.handleSubmit} >

          
            <label htmlFor="email" className='fw-bolder'>Email</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} type="email" className='form-control my-3' id="email" name="email" />
            {registerFormik.errors?.email && registerFormik.touched.email ?<div className="alert alert-danger">{registerFormik.errors?.email}</div>:null}
            
            <label htmlFor="password" className='fw-bolder'>Password</label>
            <input onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} type="password" className='form-control my-3' id="password" name="password" />
            {registerFormik.errors?.password && registerFormik.touched.password ? <div className="alert alert-danger">{registerFormik.errors?.password}</div> :null}
            

            <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} type='submit' className='btn bg-main text-white w-100 mt-4'>
                {!loading? "Login": <i className='fas fa-spinner fa-spin '></i>}
                </button>
                <Link to="/forgetPassword" className=' text-primary text-center m-auto  my-3' >Forget Password ?</Link>
                <p className='text-muted small_font mt-3  text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                        <hr className='mt-1 w-50 m-auto' />
                        <p className=' text-center mt-3 '>Create an account? <NavLink to='/register' ><span className='text-main'>Sign Up</span></NavLink></p>
        </form>
    </div>
      </div>
    
    </div>
   
   
    </>
  )
    }

