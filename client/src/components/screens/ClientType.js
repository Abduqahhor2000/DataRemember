import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClientData } from "../../store/actions/userDataAction"
import { FaListUl } from 'react-icons/fa'
import { AiFillShopping } from 'react-icons/ai'
import AddClientModal from "../modal/AddClientModal";
import EditClientModal from "../modal/EditClientModal";
import DeleteClientModal from "../modal/DeleteClientModal";

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
    const [getAllType, setGetAllType] = useState(false)
    const [clientID, setClientID] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [bio, setBio] = useState("")
    
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
                "/api/client/get", 
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
                   <span className="text">{State_Type}</span>
                  </div>
                  <div className="buttons">
                      <div className="add_type">
                        <button onClick={()=>{setIsAddClientModalOpen(true)}} type="button">+Add Client</button>
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
                          >Edit</button>
                          <button onClick={() => {setClientID(item._id); setFullName(item.fullName); setIsDeleteClientModalOpen(true)}} type="button" className="delete_type">Delete</button>
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
        </>
    )
}

export default ClientType; 