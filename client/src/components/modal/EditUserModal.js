import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./addClientTypeModal.scss"
import { addUserData } from "../../store/actions/userDataAction";

const EditUserModal = ({setIsEditUserModalOpen}) => {
    const dispatch = useDispatch()
    const State_User = useSelector(state => state.user.user)
    const [addTypeError, setAddTypeError] = useState("")
    const [username, setUsername] = useState(State_User.user.username)
    const [email, setEmail] = useState(State_User.user.email)
    const [oldpassword, setOldpassword] = useState("")
    const [oldzipCode, setOldzipCode] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [newzipCode, setNewzipCode] = useState("")
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
                    username,
                    email,
                    oldpassword,
                    oldzipCode,
                    newpassword,
                    newzipCode,
                }, config)
              console.log(data, "vghgf")
              setIsLoading(false)
              setIsAddTrue(true)
              setTimeout(()=>{
                setIsAddTrue(false)
              }, 3000)
              loginHandler()
            }catch(err){
              setIsLoading(false)
              setAddTypeError("Malumotlarni to'ldirishda xatolikka yo'l qo'ydingiz yoki bu bo'lim allaqachon o'chirilgan bolishi mumkin. Agar unday bo'lmasa, serverda xatolik mavjut!")
              setTimeout(()=>{
                setAddTypeError("")
              }, 15000)
            }
    }
     
    const loginHandler = async () => {
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        let password = ""
        if(newpassword){
            password = newpassword;
        }else{
            password = oldpassword
        }
    
        try {
          const { data } = await axios.post(
            "/api/auth/login",
            { email, password },
            config
          );
          if(State_User.user.zipCode){
            if(newzipCode){
              dispatch(addUserData({...data, user: {...data.user, zipCode: newzipCode}}))
            }else{
              dispatch(addUserData({...data, user: {...data.user, zipCode: oldzipCode}}))
            }
          }else{
            dispatch(addUserData(data))
          }
         
          // history("/private");
        } catch (error) {
          console.log(error);
          setAddTypeError("Xatolik ro'y berdi. Iltimos qayta urunib ko'ring!")
          setTimeout(() => {
            setAddTypeError("");
          }, 10000);
        }
      };      

    return (
        <ModalContainer setIsModalOpen={setIsEditUserModalOpen} >
            <div className="addType_row">
                <form onSubmit={editUserHendler}>
                        <label htmlFor="username">Foydalanuvchi Nomi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={5}
                          id="username"
                          placeholder="Ism sharifingizni kiriting..."
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="email">Elektron Pochta Manzili:</label>
                        <input
                          type="email" 
                          required 
                          minLength={6}
                          id="email"
                          placeholder="Elektron pochta manzilni kiriting..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="newPassword">Yangi Parol: <i>o'zgartirmasangiz, bo'sh holida tashlab keting</i></label>
                        <input
                          type="password"
                          minLength={8}
                          id="newPassword"
                          placeholder="Yangi parolni kiriting..."
                          value={newpassword}
                          onChange={(e) => setNewpassword(e.target.value)}
                        />
                        <label htmlFor="newZipcode"> Yangi Tastiqlash Belgisi: <i>o'zgartirmasangiz, bo'sh holida tashlab keting</i></label>
                        <input
                          type="password"  
                          minLength={6}
                          id="newZipcode"
                          placeholder="Yangi tastiqlash belgisini kiriting..."
                          value={newzipCode}
                          onChange={(e) => setNewzipCode(e.target.value)}
                        />
                        <label htmlFor="oldPassword">Eski Parol:</label>
                        <input
                          type="password" 
                          required 
                          minLength={8}
                          id="oldPassword"
                          placeholder="Eski parolni qo'shing..."
                          value={oldpassword}
                          onChange={(e) => setOldpassword(e.target.value)}
                        />
                        <label htmlFor="oldZipcode">Eski Tastiqlash Belgisi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={6}
                          id="oldZipcode"
                          placeholder="Eski tastiqlash belgisini kiriting..."
                          value={oldzipCode}
                          onChange={(e) => setOldzipCode(e.target.value)}
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Yangilash"}</button>
                          <button onClick={() => {setIsEditUserModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditUserModal;