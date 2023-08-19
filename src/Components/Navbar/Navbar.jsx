import { useContext } from "react"
import logo from "../../images/imagesSlider/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { storeContext } from "../Context/CartContext.jsx"
import { authContext } from "../Context/AuthContext.jsx"
//import { authContext } from "../Context/AuthContext.jsx"



export default function Navbar() {
 let {count } =   useContext(storeContext)
 let {userData,LogOut} =  useContext(authContext)
 let token = localStorage.getItem("token")
 //console.log({hamada:!userData});
  
  return (<>
    <nav className="navbar navbar-expand-lg bg-main-light navbar-light ">
                <div className=" container ">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span></button>
                    <div className="collapse navbar-collapse my-2" id="navbarSupportedContent">
                        
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>

                        <li className="nav-item">
                        <NavLink className="nav-link" to="/brands">Brands</NavLink>
                        </li>
                    </ul>
                    

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

                    {token  ? <>
                        <li className="nav-item ">
                            <Link to='/wishlist' type="button" className="btn  position-relative me-3 ">
                                WishList <i className="fa-regular fa-heart"></i>
                                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                               
                                <span className="visually-hidden">unread messages</span> */}
                                {/* </span> */}
                            </Link>
                        </li>
                    </> :""}

                       <li className="nav-item ">
                            <Link to='/cart' type="button" className="btn  position-relative me-3 ">
                                Cart <i className="fa-solid fa-cart-shopping" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                {count}
                                <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </li>
                       


                        {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/">LogOut</NavLink>
                        </li> */}
                      {!token ? <>   <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Sign UP</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link  " to="/login">Log In</NavLink>
                        </li></>: <>
                        <li className="nav-item nav-link cursor-pointer btn btn-border mx-2" onClick={LogOut}>
                          LogOut
                        </li> 
                        </>}

                    </ul>

                    </div>
                </div>
    </nav>


    </>
  )
}
