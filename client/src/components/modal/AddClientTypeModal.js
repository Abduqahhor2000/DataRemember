import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const AddClientTypeModal = ({setIsAddClientModalOpen, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const [addTypeError, setAddTypeError] = useState("")
    const [clientType, setClientType] = useState("")
    const [zipCode, setZipCode] = useState("")

    const addTypeHendler = async (e) => {
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
            }catch(err){
              setAddTypeError("Mavjut nomlanishni qayta qo'shayotgan bo'lishingiz mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddTypeError("")
              }, 5000)
            }
      }

    return (
        <ModalContainer setIsAddClientModalOpen={setIsAddClientModalOpen} >
            <div className="addType_row">
                      {addTypeError ? <div className="red_alert">{addTypeError}</div> : <div style={{"height": "30px"}}></div>}
                      <form onSubmit={addTypeHendler}>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="clientType"
                          placeholder="Enter Client Type Name"
                          value={clientType}
                          onChange={(e) => setClientType(e.target.value)}
                        />
                        <input
                          type="password" 
                          required 
                          minLength={6}
                          id="zipcode"
                          placeholder="Enter Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                        <button type="submit">Add</button>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default AddClientTypeModal;