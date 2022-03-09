import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const AddPaymentModal = ({setIsAddPaymentModalOpen, setEffect, effect}) => {
    const State_User = useSelector(state => state.user.user)
    const State_Client = useSelector(state => state.client.client)
    const [error, setError] = useState("")
    const [quality, setQuality] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const addPaymentHendler = async (e) => {
        setError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
              const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post("/api/client/convert", 
                    { sellerID: State_User.user._id,
                      clientID: State_Client._id,
                      convertType: "payment",
                      quality,
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
              setError("Mavjut nomlanishni qayta qo'shayotgan bo'lishingiz yoki bazi malumotlarni xato kiritgan bo'lishingiz mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setError("")
              }, 10000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsAddPaymentModalOpen} >
            <div className="addType_row">
                      <form onSubmit={addPaymentHendler}>
                        <label htmlFor="quality">Quality:</label>
                        <input
                          type="number" 
                          required 
                          id="quality"
                          placeholder="Enter Quality"
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
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
                          {error ? <div className="red_alert">{error}</div> : null}
                        </div>
                        <div className="button_list">
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Add"}</button>
                          <button className="b_reset" type="reset"
                              onClick={() => {
                                  setQuality(""); 
                                  setZipCode(""); 
                              }}
                          >Clier</button>
                          <button onClick={() => {setIsAddPaymentModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default AddPaymentModal;