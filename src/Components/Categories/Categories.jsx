import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utils/baseUrl.js'
import axios from 'axios'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx'

export default function Categories() {

    const [categories, setCategories] = useState([])

   
    const getAllCategories = async()=>{
      let {data} = await axios.get(`${baseUrl}/categories`)
      //console.log({data:data.data})
      setCategories(data.data)
      //console.log({categories});
    }
    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <>
        {categories.length !=0 ?     <div className='container  my-5'>
    <div className="row">
    {categories?.map((item)=>{
    return <div className='col-md-4 mt-4' key={item._id}> 
      <img src={item.image} className=' w-100' height={300} alt=""  />
      <h6 className=' text-main text-center my-4 fw-bolder'>{item.name}</h6>
    
    </div>

  })}
    </div>
</div> :<ProjectLoading/>}
    </>

  )
}
