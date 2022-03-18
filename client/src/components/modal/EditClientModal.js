import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./addClientTypeModal.scss"
import { addClientData } from "../../store/actions/userDataAction";

const EditClientModal = ({setIsEditClientModalOpen, setEffect, effect}) => {
    const dispatch = useDispatch()
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const State_Types = useSelector(state => state.types.types)
    const State_Client = useSelector(state => state.client.client)
    const [clientType, setClientType] = useState(State_Type.clientType)
    const [fullName, setFullName] = useState(State_Client.fullName)
    const [phoneNumber, setPhoneNumber] = useState(State_Client.phoneNumber)
    const [bio, setBio] = useState(State_Client.bio)
    const [editClientError, setEditClientError] = useState("")
    const [zipCode, setZipCode] = useState(() => State_User.user.zipCode ? State_User.user.zipCode : "")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    console.log(clientType)
    const editClientHendler = async (e) => {
        setEditClientError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
                const config = {
                    header: {
                      "Content-Type": "application/json",
                    },
                  };
                const data = await axios.put(`/api/client/${State_Client._id}`, { 
                    sellerID: State_User.user._id,
                    clientType,
                    zipCode,
                    fullName,
                    bio,
                    phoneNumber,
                }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
                setIsEditClientModalOpen(false)
              }, 2000)
              setZipCode("")
              dispatch(addClientData({
                ...State_Client,
                fullName,
                bio,
                phoneNumber,}))
            }catch(err){
              setIsLoading(false)
              setEditClientError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setEditClientError("")
              }, 15000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsEditClientModalOpen} >
            <div className="addType_row">
                <form onSubmit={editClientHendler}>
                        <label htmlFor="clientType">Mijoz Turi:</label>
                        <select 
                          id="clientType"
                          value={clientType}
                          onChange={(e) => setClientType(e.target.value)}
                        >
                          <option key="yghjfndfnddj" value="standard">standard</option>
                          {
                            State_Types.map(item => {
                              if(item.clientType === clientType){
                                return (
                                  <>
                                    <option key={item._id} value={item.clientType} >{item.clientType}</option>
                                  </>
                                )
                              }
                              return (
                                <>
                                  <option key={item._id} value={item.clientType} >{item.clientType}</option>
                                </>
                              )
                             
                            })
                          }
                        </select>
                        <label htmlFor="fullName">Mijoz Nomi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="fullName"
                          placeholder="Mijoz nomini kiriting..."
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="phoneNumber">Telefon Raqami:</label>
                        <input
                          type="tel" 
                          minLength={4}
                          id="phoneNumber"
                          placeholder="Telefon raqamini kiriting..."
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label htmlFor="bio">Malumotlar:</label>
                        <textarea style={{"width": "100% !important", "height": "100px"}}
                          id="bio"
                          placeholder="Bu yerda siz mijoz haqida eslatmalar yozib qoldirishingiz mumkin..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                       {State_User.user.zipCode ? null :
                          <>
                            <label htmlFor="zipcode">Tastiqlash Belgisi:</label>
                            <input
                              type="password" 
                              required 
                              minLength={6}
                              id="zipcode"
                              placeholder="Tastiqlash belgisini kiriting..."
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                          </>
                        }
                        {isAddTrue ? <div className="success-checkmark">
                                       <div className="check-icon">
                                         <span className="icon-line line-tip"></span>
                                         <span className="icon-line line-long"></span>
                                         <div className="icon-circle"></div>
                                         <div className="icon-fix"></div>
                                       </div>
                                     </div> : null}
                        <div className="message">
                          {editClientError ? <div className="red_alert">{editClientError}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Yangilash"}</button>
                          <button onClick={() => {setIsEditClientModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditClientModal;