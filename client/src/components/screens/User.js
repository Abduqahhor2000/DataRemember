import { useState, useEffect } from "react";
import axios from "axios";
import "./private.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Private = () => {
    const State_User = useSelector(state => state.user.user)
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([])
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    
    useEffect(() => {
      const fetchPrivateDate = async () => {
          if(!State_User.token){
              navigate("/login")
              return
          }
          console.log(State_User.user._id)
          const config = {
            headers: {"Content-Type": "application/json"},
          };
    
          try {
            const {data} = await axios.post("/api/auth/getclient_type", {sellerID: State_User.user._id}, config).then(err=> console.log(err))
            console.log(data)
            setClient_type(data);
          } catch (error) {
            console.log(error)
            setError("You are not authorized please login");
          }
        };
        fetchPrivateDate()
    }, [navigate, State_User])


    return(
        <>
            <div>
                <div>user</div>
                <div>
                  {client_type.map(item => {
                    return (
                      <div>  </div>
                    )
                  })}
                </div>
            </div>
      
        </>
    )
}

export default Private; 