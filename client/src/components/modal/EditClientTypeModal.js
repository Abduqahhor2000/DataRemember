import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { addTypeName } from "../../store/actions/userDataAction";
import "./addClientTypeModal.scss"

const EditClientTypeModal = ({setIsEditTypeModalOpen, setEffect, effect}) => {
    const dispatch = useDispatch();
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [clientType, setClientType] = useState(State_Type.clientType)
    const [addTypeError, setAddTypeError] = useState("")
    const [zipCode, setZipCode] = useState(() => State_User.user.zipCode ? State_User.user.zipCode : "")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const deleteTypeHendler = async (e) => {
        setAddTypeError(false)
        setIsLoading(true)
        e.preventDefault();
            try{
                const config = {
                    header: {
                      "Content-Type": "application/json",
                    },
                  };
                const data = await axios.put(`/api/auth/client_type/${State_Type._id}`, { 
                    sellerID: State_User.user._id,
                    clientType,
                    zipCode
                }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
                setIsEditTypeModalOpen(false)
              }, 2000)
              setZipCode("")
              dispatch(addTypeName({clientType, _id: State_Type._id}))
            }catch(err){
              setIsLoading(false)
              setAddTypeError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddTypeError("")
              }, 15000)
            }
      }

    return (
        <ModalContainer setIsModalOpen={setIsEditTypeModalOpen} >
            <div className="addType_row">
                <b>{State_Type.clientType}</b>
                <form onSubmit={deleteTypeHendler}>
                        <label htmlFor="clientType">Mijoz Turi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="clientType"
                          placeholder="Mijoz tur nomini kiriting..."
                          value={clientType}
                          onChange={(e) => setClientType(e.target.value)}
                        />
                        {State_User.user.zipCode ? null :
                          <>
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
                          </>
                        }
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Yangilash"}</button>
                          <button onClick={() => {setIsEditTypeModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditClientTypeModal;