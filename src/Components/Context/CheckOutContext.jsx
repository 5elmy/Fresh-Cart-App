import axios from "axios";
import { createContext } from "react";
import { baseUrl } from "../../Utils/baseUrl.js";



export let checkOutContext = createContext(0)

export  default function createCheckOutProvider({children}){


    function onlinePayment(cartId,shippingAddress)
    {
        let token = localStorage.getItem("token")
        if(token)
        {
            return axios.post(`${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress},{headers:{token}})
            .then(data=>data)
            .catch(err=>err)
        }
    }

    return <checkOutContext.Provider value={{onlinePayment}}>{children}</checkOutContext.Provider>

}
