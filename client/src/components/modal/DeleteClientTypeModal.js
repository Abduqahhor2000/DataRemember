import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const DeleteClientTypeModal = ({setIsDeleteTypeModalOpen, typeID, typeName, setEffect, effect}) => {
  console.log(typeID, "ssssssssssss")
    const State_User = useSelector(state => state.user.user)
    const [addTypeError, setAddTypeError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const deleteTypeHendler = async (e) => {
        setAddTypeError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const data = await axios.delete(`/api/auth/client_type/${typeID}`,{ 
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  sellerID: State_User.user._id, 
                  zipCode
                }
              })
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
                setIsDeleteTypeModalOpen(false)
              }, 2000)
              setZipCode("")
            }catch(err){
              setIsLoading(false)
              setAddTypeError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddTypeError("")
              }, 15000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsDeleteTypeModalOpen} >
            <div className="addType_row">
                <b>{typeName}</b>
                <form onSubmit={deleteTypeHendler}>
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
                          {addTypeError ? <div className="red_alert">{addTypeError}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Delete"}</button>
                          <button onClick={() => {setIsDeleteTypeModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default DeleteClientTypeModal;