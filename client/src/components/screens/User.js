import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie, FaListUl } from 'react-icons/fa'

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
            const data = await axios.post("/api/auth/getclient_type", {sellerID: State_User.user._id}, config)
            console.log(data.data.data)
            setClient_type(data.data.data);
          } catch (error) {
            console.log(error)
            setError("You are not authorized please login");
          }
        };
        fetchPrivateDate()
    }, [navigate, State_User])


    return(
        <>
            <div className="user">
                <div className="panel">
                  <div className="name">
                   <span className="icon"><FaUserTie/></span>
                   <span className="text">{State_User?.user?.username}</span>
                  </div>
                </div>
                <div className="types">
                  {client_type.map(item => {
                    return (
                      <div className="type">
                        <div className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">{item.clientType}</div>
                          <div className="quality">{item.quality}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
        </>
    )
}

export default Private; 