import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"
import { useNavigate } from "react-router-dom";

const DeleteClientModal = ({setIsDeleteClientModalOpen, setEffect, effect}) => {
    const navigate = useNavigate()
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const State_Client = useSelector(state => state.client.client)
    const [deleteClientError, setDeleteClientError] = useState("")
    const [zipCode, setZipCode] = useState(() => State_User.user.zipCode ? State_User.user.zipCode : "")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const deleteClientHendler = async (e) => {
        setDeleteClientError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const data = await axios.delete(`/api/client/${State_Client._id}`,{ 
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  sellerID: State_User.user._id, 
                  clientType: State_Type.clientType,
                  zipCode
                }
              })
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
                setIsDeleteClientModalOpen(false)
              }, 2000)
              setZipCode("")
              navigate("/client-type")
            }catch(err){
              setIsLoading(false)
              setDeleteClientError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setDeleteClientError("")
              }, 15000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsDeleteClientModalOpen} >
            <div className="addType_row">
                <b>{State_Client.fullName}</b>
                <form onSubmit={deleteClientHendler}>
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
                          {deleteClientError ? <div className="red_alert">{deleteClientError}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"O'chirish"}</button>
                          <button onClick={() => {setIsDeleteClientModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default DeleteClientModal;