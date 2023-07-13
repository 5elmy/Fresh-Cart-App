import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { baseUrl, sizeNum } from '../../Utils/baseUrl.js'
import Product from '../Product/Product.jsx'
import Slider from 'react-slick'
import ProjectLoading from '../ProjectLoading/ProjectLoading.jsx'
import ReactPaginate from 'react-paginate';


export default function Products() {
    
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
  

  

    
   
   const getAllProducts = async (page)=>{
      
      let {data} = await axios.get(`${baseUrl}/products?page=${page}`)
     
       console.log({get:data});
      setProducts(data.data);  
  }

 

  let handlePageClick = (e)=>{
    let currentPage = e.selected+1
    
      getPage(currentPage)
   }

   function getPage(page1) {
    
    setPage(page1);
   }
 
  

  
 



    useEffect(()=>{
    
     getAllProducts(page)
      },[page])

    const settings = {
     //  dots: true,
       infinite: true,
       slidesToShow: 6,
       slidesToScroll: 1,
       autoplay: true,
       speed: 2000,
       autoplaySpeed: 2000,
       cssEase: "linear"
     };

  return (
    <>
      {products.length !=0?<>       <div className='my-3 container '>
        
          <Slider  {...settings} >
        
      {products?.map((item)=>{
        return <div key={item._id}> 
          <img src={item.imageCover} className=' w-100'  alt=""  /> 
        </div>

      })}

   
   </Slider>
   </div>
        <div className="container">
            <div className="row">
                         <Product products={products}/>
                         

            </div>
           
        </div> </>: <ProjectLoading/>}
        <ReactPaginate
      previousLabel={'< previous'}
      nextLabel={'next >'}
      breakLabel={'...'}
      pageCount={2}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={'pagination justify-content-center py-5'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link bg-ligth text-success'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link bg-ligth text-success'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link bg-ligth text-success'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link bg-ligth text-success'}
      // activeClassName={'active'}
    />
       
    </>
  )
}
