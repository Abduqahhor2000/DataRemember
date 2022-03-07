import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const AddClientModal = ({setIsAddClientModalOpen, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [addClientError, setAddClientError] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [bio, setBio] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const addClientHendler = async (e) => {
        setAddClientError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post("/api/client", 
                    { sellerID: State_User.user._id,
                      clientType: State_Type,
                      phoneNumber,
                      fullName,
                      bio,
                      zipCode }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
              }, 5000)
            }catch(err){
              setIsLoading(false)
              setAddClientError("Mavjut nomlanishni qayta qo'shayotgan bo'lishingiz yoki bazi malumotlarni xato kiritgan bo'lishingiz mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddClientError("")
              }, 10000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsAddClientModalOpen} >
            <div className="addType_row">
                      <form onSubmit={addClientHendler}>
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
                          {addClientError ? <div className="red_alert">{addClientError}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Add"}</button>
                          <button className="b_reset" type="reset"
                              onClick={() => {
                                                setFullName(""); 
                                                setZipCode(""); 
                                                setBio(""); 
                                                setPhoneNumber("")}}
                          >Clier</button>
                          <button onClick={() => {setIsAddClientModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default AddClientModal;