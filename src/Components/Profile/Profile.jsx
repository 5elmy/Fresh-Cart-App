// import React, { useContext, useEffect, useState } from 'react'
// import { authContext } from '../Context/AuthContext.jsx';

// export default function Profile() {
//         let {userData}=useContext(authContext);
//     let {  name} =userData
//     const [first, setfirst] = useState(false)
//     useEffect(()=>{
//         setfirst(true)
//     },[userData])
//     return (
//         <>
        
//         {userData ?  <>
//            <h2 className='h1 mt-5 text-center'> Your Profile </h2>
    
//           <div className="container mt-5 py-5">
//           <div className="row">
//             <div className="col-md-6">
//               <div className='float-end'>
//               {/* <img src={`${image}`} className={`img_pro mt-0 mb-3`} alt="" /> */}
              
//               </div>
    
//             </div>
//             <div className="col-md-6">
//               <div className='mt-5'>
//               <p className='my-4'>First name :<span className='secondColor'></span> </p>
//               <p className='my-4'>Last name: <span className='secondColor' ></span></p>
//               <p className='my-4'>Email: <span className='secondColor'>{'  '}{name}</span> </p>
//               <p className='my-4'>Age: <span className='secondColor'>{'  '}</span> </p>
             
              
//               </div>
//               <span className='clearfix'></span>
          
    
    
//             </div>
//           </div>
//         </div>
       
       
           
//         </>:'loading'}
//         </>
//       )
// }

