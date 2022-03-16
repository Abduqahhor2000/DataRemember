import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./addClientTypeModal.scss"
import { addUserData } from "../../store/actions/userDataAction";

const AddZipCodeModal = ({setIsAddZipCodeModalOpen}) => {
    const dispatch = useDispatch();
    const State_User = useSelector(state => state.user.user)
    const State_Type = useSelector(state => state.typename.typename)
    const [addTypeError, setAddTypeError] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAddTrue, setIsAddTrue] = useState(false)

    const editUserHendler = async (e) => {
        setAddTypeError(false)
        setIsLoading(true)
        e.preventDefault();
        try{
            const config = {
                header: {
                  "Content-Type": "application/json",
                },
            };
            const data = await axios.put(`/api/auth/update/${State_User.user._id}`, { 
                username: State_User.user.username,
                email: State_User.user.email,
                oldpassword: password,
                oldzipCode: zipCode,
            }, config) 
            console.log(data, "vghgf")
            setIsLoading(false)
            setIsAddTrue(true)
            setTimeout(()=>{
              setIsAddTrue(false)
            }, 3000)
            dispatch(addUserData({...State_User, user: {...State_User.user, zipCode}}))
        }catch(err){
            setIsLoading(false)
            setAddTypeError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
            setTimeout(()=>{
              setAddTypeError("")
            }, 15000)
        }
    }

    return (
        <ModalContainer setIsModalOpen={setIsAddZipCodeModalOpen} >
            <div className="addType_row">
                <b>{State_Type.clientType}</b>
                <form onSubmit={editUserHendler}>
                        <label htmlFor="password">Parol:</label>
                        <input
                          type="password" 
                          required 
                          minLength={6}
                          id="password"
                          placeholder="Parolni kiriting..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          <button className="b_delete" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"O'chirish"}</button>
                          <button onClick={() => {setIsAddZipCodeModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default AddZipCodeModal;