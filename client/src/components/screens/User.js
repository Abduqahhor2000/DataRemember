import { useState, useEffect } from "react";
import axios from "axios";
import "./private.scss";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Private = () => {
    const user = useSelector(state => state.user.user)
    const history = useLocation();
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    console.log(user, "axiri")

    useEffect(() => {
        const fetchPrivateDate = async () => {
          if(!localStorage.getItem("authToken")){
            history("/login")
          }
          const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
    
          try {
            const data = await axios.get("api/auth/client_type", {sellerID: "fnpm" , ...config});
            console.log(data)
            setPrivateData(data.data);
          } catch (error) {
            setError("You are not authorized please login");
          }
        };
        fetchPrivateDate()
    }, [history])


    return(
        <>
            <div>
                <div>user</div>
                <div>data</div>
            </div>
      
        </>
    )
}

export default Private;