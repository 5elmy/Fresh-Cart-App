import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utils/baseUrl.js'
import { Link } from 'react-router-dom'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx'

export default function Brand() {
    const [brands, setBrands] = useState([])
    const getAllBrands= async ()=>{
        let {data} = await axios.get(`${baseUrl}/Brands`)
        //console.log({Brands:data.data})
        setBrands(data.data)
    }
    useEffect(()=>{
        getAllBrands()
        },[])
  return (
    <>
            {brands.length !=0 ?  <div className="container">
        <div className="row">
        {
        brands.map((item)=>{
            return <div key={item._id} className="col-md-3 mt-3">
                <div className='product'>
                       {/* <Link to={`/product-details/${item._id}`}> */}
                       <img src={item.image} className='w-100'    alt="" />
                        <h6 className='text-main text-center fw-bolder'>{item.name}</h6>
                                               </div>

                       {/* </Link> */}
                        {/* <button onClick={()=>{addProduct(item._id)}} className='btn bg-main text-white w-100'>Add To Cart</button> */}
                </div>
          
        })
    }
        </div>
       </div> :<ProjectLoading/>}
    </>
  )
}
