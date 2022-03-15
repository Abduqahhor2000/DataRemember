import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClientData } from "../../store/actions/userDataAction"
import { FaListUl } from 'react-icons/fa'
import { GrPrevious } from 'react-icons/gr'
import { AiFillShopping } from 'react-icons/ai'
import AddClientModal from "../modal/AddClientModal";
import EditClientModal from "../modal/EditClientModal";
import DeleteClientModal from "../modal/DeleteClientModal";
import EditClientTypeModal from "../modal/EditClientTypeModal";
import DeleteClientTypeModal from "../modal/DeleteClientTypeModal";
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"

const ClientType = () => {
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [effect, setEffect] = useState(0)
    const [clients, setClients] = useState([])
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
    const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
    const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false)
    const [isEditTypeModalOpen, setIsEditTypeModalOpen] = useState(false)
    const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = useState(false)
    const [getAllType, setGetAllType] = useState(false)
    const [clientID, setClientID] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [bio, setBio] = useState("")
    
    useEffect(() => {
      const fetchPrivateDate = async () => {
          if(!State_User?.token){
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
                "/api/client/get", 
                {
                  sellerID: State_User?.user?._id,
                  clientType: State_Type?.clientType, 
                }, config)
                console.log(State_User.user._id, State_Type, data)
            setClients(data.data.data.reverse());
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
                  <div onClick={()=>{navigate("/user")}} style={{"cursor":"pointer"}} className="name">
                   <span style={{"margin": "-5px 20px 0 15px"}} className="icon"><GrPrevious/></span>     
                  </div>
                  <div className="buttons">
                      <div className="add_type">
                      <span className="text">{State_Type.clientType}</span> &nbsp;
                        <UncontrolledButtonDropdown style={{"marginRight": "5px"}}>
                            <DropdownToggle caret style={{"fontSize":"12px", "padding": "5px 5px 7px" }}> 
                            <span style={{"tabSize" : "40px"}}>&nbsp;<FaListUl style={{"tabSize" : "40px"}}/>&nbsp;</span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={()=>{setIsAddClientModalOpen(true)}} style={{"fontSize":"12px"}} >
                                  Yangi mijoz qo'shish
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem onClick={() => {setIsEditTypeModalOpen(true)}} style={{"fontSize":"12px"}}>
                                  Guruh malumotlarini yangilash
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem onClick={() => {setIsDeleteTypeModalOpen(true)}} style={{"fontSize":"12px"}}>
                                  Guruhni o'chirish
                              </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
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
                </div> : clients.map(item => {
                    return (
                      <div className="type" key={item._id}>
                        <div onClick={()=>{dispatch(addClientData(item)); navigate("/client")}} className="type_left">
                          <div className="type_icon"><AiFillShopping/></div>
                          <div className="type_name">{item.fullName}</div>
                          <div className="quality">{item.phoneNumber}</div>
                        </div>
                        <div className="type_buttons">
                          <button type="button" className="edit_type"
                            onClick={ () => {
                                setClientID(item._id);
                                setFullName(item.fullName); 
                                setBio(item.bio);
                                setPhoneNumber(item.phoneNumber)
                                setIsEditClientModalOpen(true)}}
                          >Yangilash</button>
                          <button onClick={() => {setClientID(item._id); setFullName(item.fullName); setIsDeleteClientModalOpen(true)}} type="button" className="delete_type">O'chirish</button>
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
            { isEditClientModalOpen ? <EditClientModal
                                      setIsEditClientModalOpen={setIsEditClientModalOpen} 
                                      _fullName={fullName}
                                      _phoneNumber={phoneNumber}
                                      _bio={bio}
                                      clientID={clientID}
                                      setEffect={setEffect} 
                                      effect={effect}
                                    /> : null }
            { isDeleteClientModalOpen ? <DeleteClientModal
                                        setIsDeleteClientModalOpen={setIsDeleteClientModalOpen}
                                        clientID={clientID}
                                        fullName={fullName}
                                        setEffect={setEffect} 
                                        effect={effect}
                                      /> : null }
            { isEditTypeModalOpen ? <EditClientTypeModal
                                      setIsEditTypeModalOpen={setIsEditTypeModalOpen} 
                                      setEffect={setEffect} 
                                      effect={effect}
                                    /> : null }
            { isDeleteTypeModalOpen ? <DeleteClientTypeModal
                                        setIsDeleteTypeModalOpen={setIsDeleteTypeModalOpen}
                                        setEffect={setEffect} 
                                        effect={effect}
                                      /> : null }
        </>
    )
}

export default ClientType; 