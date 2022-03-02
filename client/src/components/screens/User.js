import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserTie, FaListUl } from 'react-icons/fa'
import AddClientTypeModal from "../modal/AddClientTypeModal";
import EditClientTypeModal from "../modal/EditClientTypeModal";
import DeleteClientTypeModal from "../modal/DeleteClientTypeModal"

const Private = () => {
    const State_User = useSelector(state => state.user.user)
    const [effect, setEffect] = useState(0)
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([])
  
    const [isAddTypeModalOpen, setIsAddClientModalOpen] = useState(true)
    const [isEditTypeModalOpen, setIsEditTypeModalOpen] = useState(false)
    const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = useState(false)
    
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
          }
        };
        fetchPrivateDate()
    }, [navigate, State_User, effect])

 


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
            { isAddTypeModalOpen ? <AddClientTypeModal
                                      setIsAddClientModalOpen={setIsAddClientModalOpen} 
                                      setEffect={setEffect} 
                                      effect={effect} /> : null }
            { isEditTypeModalOpen ? <EditClientTypeModal/> : null }
            { isDeleteTypeModalOpen ? <DeleteClientTypeModal/> : null }
        </>
    )
}

export default Private; 