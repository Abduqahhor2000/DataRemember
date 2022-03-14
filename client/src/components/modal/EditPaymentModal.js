import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const EditClientModal = ({setIsEditPaymentModalOpen, convertID, _quality, setEffect, effect}) => {
    const State_User = useSelector(state => state?.user?.user)
    const State_Client = useSelector(state => state?.client?.client)
    const [quality, setQuality] = useState(_quality)
    const [error, setError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isTrue, setIsTrue] = useState(false)

    const editPaymentHendler = async (e) => {
        setError(false)
        setIsLoading(true)
        e.preventDefault();
        console.log({
          sellerID: State_User.user._id,
          clientID: State_Client._id,
          convertType: "payment",
          zipCode,
          quality,
        })
            try{
                const config = {
                    header: {
                      "Content-Type": "application/json",
                    },
                  };
                const data = await axios.post(`api/client/convert/${convertID}/update`, { 
                    sellerID: State_User.user._id,
                    clientID: State_Client._id,
                    convertType: "payment",
                    zipCode,
                    quality,
                }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsTrue(true)
              setTimeout(()=>{
                setIsTrue(false)
                setIsEditPaymentModalOpen(false)
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
        <ModalContainer setIsModalOpen={setIsEditPaymentModalOpen} >
            <div className="addType_row">
                <form onSubmit={editPaymentHendler}>
                        <label htmlFor="quality">Kirim Qiymati:</label>
                        <input
                          type="number" 
                          required 
                          minLength={4}
                          id="quality"
                          placeholder="Kirim qiymatini kiriting..."
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Yangilash"}</button>
                          <button onClick={() => {setIsEditPaymentModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditClientModal;