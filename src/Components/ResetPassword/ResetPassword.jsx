import { useFormik } from 'formik'
import React, { useState } from 'react'
import { notify } from '../../Utils/notify.js';
import { baseUrl } from '../../Utils/baseUrl.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let validate =(values)=>{
        let errors={};
        if (!values.email) {
            errors.email = 'email is required ';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email ';
          }

          if (!values.newPassword) {
            errors.password = 'password is required ';
          } else if (!/^[a-zA-Z0-9@]{3,30}$/i.test(values.password)) {
            errors.password = 'invalid password ';
          }
          return errors
    }
    async function handelLoginPassword(values)
    {
      setLoading(true)
      await axios.put(`${baseUrl}/auth/resetPassword` , values).then(data=>{
        if(data.data.token)
        {
                setLoading(true)
               notify({msg:'Password updated successfully',type:'success'})
                navigate('/login')
         
        }
        //console.log({data})
       
    }).catch((err)=>{
     setLoading(false)
     notify({msg:err.response.data.message , type:'error'})
    
    })
    }

    let initPasswordFormik = useFormik({
        initialValues:{
            email:"",
            newPassword:""

        },
        validate,
        onSubmit:handelLoginPassword
    })
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center">
        <div className='w-75 my-5'>
        <form action="" onSubmit={initPasswordFormik.handleSubmit}>
            <h3 className='text-center'>Reset Password</h3>
            <label htmlFor="email">Email</label>
            <input onBlur={initPasswordFormik.handleBlur} onChange={initPasswordFormik.handleChange} value={initPasswordFormik.values.email} type="text" className='form-control my-3' id='email' name='email' />
            {initPasswordFormik.errors.email && initPasswordFormik.touched.email?<div className="alert alert-danger"></div> : null }
            
            <label htmlFor="newPassword">New Password</label>
            <input onBlur={initPasswordFormik.handleBlur} onChange={initPasswordFormik.handleChange} value={initPasswordFormik.values.newPassword} type="password"  className='form-control my-3' id='newPassword' name='newPassword' />
            {initPasswordFormik.errors.newPassword && initPasswordFormik.touched.newPassword ? <div className="alert alert-danger"></div>:null}
            <button disabled={!(initPasswordFormik.isValid && initPasswordFormik.dirty &&!loading ) } className='btn bg-main text-white w-100' > Submit </button>
        
        </form>
            
        </div>
    </div>
  
    </>
  )
}
