import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData, addTypeName } from "../../store/actions/userDataAction"
import { FaListUl } from 'react-icons/fa'
import { AiFillShopping } from 'react-icons/ai'
import AddClientModal from "../modal/AddClientModal";
import EditClientTypeModal from "../modal/EditClientTypeModal";
import DeleteClientTypeModal from "../modal/DeleteClientTypeModal";
import EditUserModal from "../modal/EditUserModal";

const ClientType = () => {
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const dispatch = useDispatch()
    const [effect, setEffect] = useState(0)
    const navigate = useNavigate();
    const [clients, setClients] = useState([])
    const [typeID, setTypeID] = useState("")
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
    const [isEditTypeModalOpen, setIsEditTypeModalOpen] = useState(false)
    const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = useState(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
    const [typeName, setTypeName] = useState("")
    const [getAllType, setGetAllType] = useState(false)
    
    useEffect(() => {
      const fetchPrivateDate = async () => {
          if(!State_User.token){
              navigate("/login")
              return
          }

          const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          try {
            const data = await axios.post(
                "/api/client", 
                {
                  sellerID: State_User.user._id,
                  clientType: State_Type, 
                }, config)
                console.log(State_User.user._id,State_Type,data)
            setClients(data.data.data);
            setGetAllType(true)
          } catch (error) {
            console.log(error)
            setGetAllType(false)
          }
        };
        fetchPrivateDate()
    }, [navigate, State_Type, State_User, effect])

 


    return(
        <>
            <div className="user">
                <div className="panel">
                  <div className="name">
                   <span className="icon"><FaListUl/></span>
                   <span className="text">{}</span>
                  </div>
                  <div className="buttons">
                      <div className="add_type">
                        <button onClick={()=>{setIsAddClientModalOpen(true)}} type="button">+Add Type</button>
                      </div>
                      <div className="edit_user">
                        <button onClick={()=>{setIsEditUserModalOpen(true)}} >Edit User</button>
                      </div>
                      <div className="log_out">
                        <button onClick={()=>{dispatch(clearUserData())}}>Log Out</button>
                      </div>
                  </div>
                </div>
                <div className="types">
                  {!getAllType ?  <div class="loadingio-spinner-spinner-0udingbvrrcc">
                  <div class="ldio-3opmt1mq4co">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </div>
                </div> : clients.map(item => {
                    return (
                      <div className="type" key={item._id}>
                        <div onClick={()=>{dispatch(addTypeName(item.clientType)); navigate("/client")}} className="type_left">
                          <div className="type_icon"><AiFillShopping/></div>
                          <div className="type_name">{item.clientType}</div>
                          <div className="quality">{item.quality}</div>
                        </div>
                        <div className="type_buttons">
                          <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsEditTypeModalOpen(true)}} type="button" className="edit_type">Edit</button>
                          <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsDeleteTypeModalOpen(true)}} type="button" className="delete_type">Delete</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
            { isAddClientModalOpen ?  <AddClientModal
                                      setIsAddClientModalOpen={setIsAddClientModalOpen} 
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

export default ClientType; 