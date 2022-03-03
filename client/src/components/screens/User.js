import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserTie, FaListUl } from 'react-icons/fa'
import AddClientTypeModal from "../modal/AddClientTypeModal";
import EditClientTypeModal from "../modal/EditClientTypeModal";
import DeleteClientTypeModal from "../modal/DeleteClientTypeModal";
import EditUserModal from "../modal/EditUserModal";

const Private = () => {
    const State_User = useSelector(state => state.user.user)
    const [effect, setEffect] = useState(0)
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([])
    const [typeID, setTypeID] = useState("")
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false)
    const [isEditTypeModalOpen, setIsEditTypeModalOpen] = useState(false)
    const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = useState(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
    const [typeName, setTypeName] = useState("")
    
    useEffect(() => {
      const fetchPrivateDate = async () => {
          if(!State_User.token){
              navigate("/login")
              return
          }
          const config = {
            headers: {"Content-Type": "application/json"},
          };
    
          try {
            const data = await axios.post("/api/auth/getclient_type", {sellerID: State_User.user._id}, config)
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
                  <div className="buttons">
                      <div className="add_type">
                        <button onClick={()=>{setIsAddTypeModalOpen(true)}} type="button">+Add Type</button>
                      </div>
                      <div className="edit_user">
                        <button onClick={()=>{setIsEditUserModalOpen(true)}} >Edit User</button>
                      </div>
                  </div>
                </div>
                <div className="types">
                  
                  {client_type.map(item => {
                    return (
                      <div className="type" key={item._id}>
                        <div className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">{item.clientType}</div>
                          <div className="quality">{item.quality}</div>
                        </div>
                        <div>
                        <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsEditTypeModalOpen(true)}} type="button">Edit</button>
                        <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsDeleteTypeModalOpen(true)}} type="button">Delete</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
            { isAddTypeModalOpen ?  <AddClientTypeModal
                                      setIsAddTypeModalOpen={setIsAddTypeModalOpen} 
                                      setEffect={setEffect} 
                                      effect={effect}
                                    /> : null }
            { isEditTypeModalOpen ? <EditClientTypeModal
                                      setIsEditTypeModalOpen={setIsEditTypeModalOpen} 
                                      typeName={typeName}
                                      typeID={typeID}
                                      setEffect={setEffect} 
                                      effect={effect}
                                    /> : null }
            { isDeleteTypeModalOpen ? <DeleteClientTypeModal
                                        setIsDeleteTypeModalOpen={setIsDeleteTypeModalOpen}
                                        typeID={typeID}
                                        typeName={typeName}
                                        setEffect={setEffect} 
                                        effect={effect}
                                      /> : null }
            { isEditUserModalOpen ? <EditUserModal
                                        setIsEditUserModalOpen={setIsEditUserModalOpen}
                                      /> : null }
        </>
    )
}

export default Private; 