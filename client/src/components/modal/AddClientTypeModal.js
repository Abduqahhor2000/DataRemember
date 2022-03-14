import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const AddClientTypeModal = ({setIsAddTypeModalOpen, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const [addTypeError, setAddTypeError] = useState("")
    const [clientType, setClientType] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const addTypeHendler = async (e) => {
        setAddTypeError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post("/api/auth/client_type", { sellerID: State_User.user._id, clientType, zipCode }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
              }, 5000)
              setZipCode("")
              setClientType("")
            }catch(err){
              setIsLoading(false)
              setAddTypeError("Mavjut nomlanishni qayta qo'shayotgan bo'lishingiz yoki bazi malumotlarni xato kiritgan bo'lishingiz mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddTypeError("")
              }, 10000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsAddTypeModalOpen} >
            <div className="addType_row">
                      <form onSubmit={addTypeHendler}>
                        <label htmlFor="clientType">Mijozning Turi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="clientType"
                          placeholder="Mijozning turini kiriting..."
                          value={clientType}
                          onChange={(e) => setClientType(e.target.value)}
                        />
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Qo'shish"}</button>
                          <button onClick={() => {setClientType(""); setZipCode("")}} className="b_reset" type="reset">Tozalash</button>
                          <button onClick={() => {setIsAddTypeModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default AddClientTypeModal;