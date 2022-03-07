import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const DeleteClientModal = ({setIsDeleteClientModalOpen, clientID, clientName, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [deleteClientError, setDeleteClientError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const deleteClientHendler = async (e) => {
        setDeleteClientError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const data = await axios.delete(`/api/client/${clientID}`,{ 
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  sellerID: State_User.user._id, 
                  clientType: State_Type,
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
                <b>{clientName}</b>
                <form onSubmit={deleteClientHendler}>
                        <label htmlFor="zipcode">Zip Code:</label>
                        <input
                          type="password" 
                          required 
                          minLength={6}
                          id="zipcode"
                          placeholder="Enter Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Delete"}</button>
                          <button onClick={() => {setIsDeleteClientModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default DeleteClientModal;