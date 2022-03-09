import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const DeleteConvertModal = ({setIsDeleteConvertModalOpen, convertID, quality, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const State_Client = useSelector(state => state.client.client)
    const [error, setError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isTrue, setIsTrue] = useState(false)
    console.log(convertID)

    const deleteConvertHendler = async (e) => {
        setError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const data = await axios.delete(`/api/client/convert/${convertID}`,{ 
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  clientID: State_Client._id, 
                  sellerID: State_User.user._id, 
                  zipCode
                }
              })
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsTrue(true)
              setTimeout(()=>{
                setIsTrue(false)
                setIsDeleteConvertModalOpen(false)
              }, 2000)
              setZipCode("")
            }catch(err){
              setIsLoading(false)
              setError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setError("")
              }, 15000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsDeleteConvertModalOpen} >
            <div className="addType_row">
                <b>{quality}</b>
                <form onSubmit={deleteConvertHendler}>
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
                        {isTrue ? <div className="success-checkmark">
                                       <div className="check-icon">
                                         <span className="icon-line line-tip"></span>
                                         <span className="icon-line line-long"></span>
                                         <div className="icon-circle"></div>
                                         <div className="icon-fix"></div>
                                       </div>
                                     </div> : null}
                        <div className="message">
                          {error ? <div className="red_alert">{error}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_delete" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Delete"}</button>
                          <button onClick={() => {setIsDeleteConvertModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default DeleteConvertModal;