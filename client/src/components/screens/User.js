import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData, addTypeName, addTypesData, clearTypeName, clearClientData, clearTypesData } from "../../store/actions/userDataAction"
import { FaUserTie, FaListUl } from 'react-icons/fa'
import AddClientTypeModal from "../modal/AddClientTypeModal";
import EditUserModal from "../modal/EditUserModal";
import AddZipCodeModal from "../modal/AddZipCodeModal";

const User = () => {
    const State_User = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [effect, setEffect] = useState(0)
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([])
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
    const [isAddZipCodeModalOpen, setIsAddZipCodeModalOpen] = useState(false)
    const [getAllType, setGetAllType] = useState(false)
    
    useEffect(() => {
      if(!State_User.token){
        navigate("/login")
        return
      }
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
                      <UncontrolledButtonDropdown style={{"marginRight":"10px"}}>
                        <DropdownToggle caret style={{"fontSize" : "12px"}}>
                          Menu
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={()=>{setIsAddTypeModalOpen(true)}} style={{"fontSize" : "12px"}}>
                            Yangi guruh qo'shish
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={()=>{setIsEditUserModalOpen(true)}} style={{"fontSize" : "12px"}}>
                            Shaxsiy malumotlarni o'zgartirish
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={()=>{setIsAddZipCodeModalOpen(true)}} style={{"fontSize" : "12px"}}>
                            Tastiqlash belgisi saqlash
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem style={{"fontSize" : "12px"}} 
                              onClick={()=>{
                                  dispatch(clearUserData())
                                  dispatch(clearTypeName())
                                  dispatch(clearClientData())
                                  dispatch(clearTypesData())
                              }} >
                            Butkul chiqib ketish
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
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
                        <div onClick={()=>{dispatch(addTypeName({clientType: "standard"})); navigate("/client-type")}} className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">standard</div>
                        </div>
                  </div>
                  {client_type.map(item => {
                    return (
                      <div className="type" key={item._id}>
                        <div onClick={()=>{dispatch(addTypeName({clientType: item.clientType, _id: item._id})); navigate("/client-type")}} className="type_left">
                          <div className="type_icon"><FaListUl/></div>
                          <div className="type_name">{item.clientType}</div>
                          <div className="quality">{item.quality}</div>
                        </div>
                        <div className="type_buttons">
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
            { isAddZipCodeModalOpen ?  <AddZipCodeModal
                                      setIsAddZipCodeModalOpen={setIsAddZipCodeModalOpen} 
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