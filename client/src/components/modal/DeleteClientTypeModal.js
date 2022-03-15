import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"
import { useNavigate } from "react-router-dom";

const DeleteClientTypeModal = ({setIsDeleteTypeModalOpen, setEffect, effect}) => {
  const navigate = useNavigate()
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [addTypeError, setAddTypeError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const deleteTypeHendler = async (e) => {
        setAddTypeError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const data = await axios.delete(`/api/auth/client_type/${State_Type._id}`,{ 
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
              navigate("/user")
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
                <b>{State_Type.clientType}</b>
                <form onSubmit={deleteTypeHendler}>
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
                          <button className="b_delete" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"O'chirish"}</button>
                          <button onClick={() => {setIsDeleteTypeModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default DeleteClientTypeModal;