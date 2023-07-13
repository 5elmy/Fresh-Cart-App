
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export let authContext= createContext(0)

export default function AuthContextProvider({children}){
   
        let navigate = useNavigate()
    const [userData, setUserData] = useState(null)

    function getuserToken(){
    let token = localStorage.getItem("token")
      setUserData(token)
    }
    function LogOut(){
        localStorage.removeItem("token")
       setUserData(null)
        navigate("/login")
    }
    useEffect(()=>{
        getuserToken()

        // if(localStorage.getItem('token')!= null)
        // {
        //  SaveUserData()
        // }
      },[])
    

    // function SaveUserData()
    // {
    // let encryptionData= localStorage.getItem('token');
    // let decryptionData=jwtDecode(encryptionData);
    //  //console.log(decryptionData);
    // setUserData(decryptionData);
    // }



  
    

    return <authContext.Provider value={{userData , setUserData, LogOut}}>
        {children}
    </authContext.Provider>
}