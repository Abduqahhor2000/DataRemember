import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const EditClientModal = ({setIsEditClientModalOpen, clientID, _fullName, _bio, _phoneNumber, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [fullName, setFullName] = useState(_fullName)
    const [phoneNumber, setPhoneNumber] = useState(_phoneNumber)
    const [bio, setBio] = useState(_bio)
    const [editClientError, setEditClientError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

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
                const data = await axios.put(`/api/client/${clientID}`, { 
                    sellerID: State_User.user._id,
                    clientType: State_Type,
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
                        <label htmlFor="fullName">Client Name:</label>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="fullName"
                          placeholder="Enter Client Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                          type="tel" 
                          minLength={4}
                          id="phoneNumber"
                          placeholder="Enter Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label htmlFor="bio">Bio:</label>
                        <textarea style={{"width": "100% !important", "height": "100px"}}
                          id="bio"
                          placeholder="Bu yerda siz mijoz haqida eslatmalar yozib qoldirishingiz mumkin..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
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
                          {editClientError ? <div className="red_alert">{editClientError}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Edit"}</button>
                          <button onClick={() => {setIsEditClientModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditClientModal;