import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData, addTypeName, addTypesData } from "../../store/actions/userDataAction"
import { FaUserTie, FaListUl } from 'react-icons/fa'
import AddClientTypeModal from "../modal/AddClientTypeModal";
import EditClientTypeModal from "../modal/EditClientTypeModal";
import DeleteClientTypeModal from "../modal/DeleteClientTypeModal";
import EditUserModal from "../modal/EditUserModal";

const User = () => {
    const State_User = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [effect, setEffect] = useState(0)
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([])
    const [typeID, setTypeID] = useState("")
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false)
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
            headers: {"Content-Type": "application/json"},
          };
    
          try {
            const data = await axios.post("/api/auth/getclient_type", {sellerID: State_User.user._id}, config)
            setClient_type(data.data.data.reverse());
            dispatch(addTypesData(data.data.data))
            setGetAllType(true)
          } catch (error) {
            console.log(error)
            setGetAllType(false)
          }
        };
        fetchPrivateDate()
    }, [navigate, State_User, effect, dispatch])

 


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
                        <button onClick={()=>{setIsAddTypeModalOpen(true)}} type="button">+Yangi sahifa</button>
                      </div>
                      <div className="edit_user">
                        <button onClick={()=>{setIsEditUserModalOpen(true)}}>Yangilash</button>
                      </div>
                      <div className="log_out">
                        <button onClick={()=>{dispatch(clearUserData())}}>Chiqish</button>
                      </div>
                  </div>
                </div>
                <div className="types">
                  {!getAllType ?  <div className="loadingio-spinner-spinner-0udingbvrrcc">
                  <div className="ldio-3opmt1mq4co">
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
                </div> 
                : <>
                  <div className="type" key={"standard"}>
                        <div onClick={()=>{dispatch(addTypeName("standard")); navigate("/client-type")}} className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">standard</div>
                        </div>
                  </div>
                  {client_type.map(item => {
                    return (
                      <div className="type" key={item._id}>
                        <div onClick={()=>{dispatch(addTypeName(item.clientType)); navigate("/client-type")}} className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">{item.clientType}</div>
                          <div className="quality">{item.quality}</div>
                        </div>
                        <div className="type_buttons">
                          <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsEditTypeModalOpen(true)}} type="button" className="edit_type">Yangilash</button>
                          <button onClick={() => {setTypeID(item._id); setTypeName(item.clientType); setIsDeleteTypeModalOpen(true)}} type="button" className="delete_type">O'chirish</button>
                        </div>
                      </div>
                    )
                  })}
                </>}
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

export default User; 