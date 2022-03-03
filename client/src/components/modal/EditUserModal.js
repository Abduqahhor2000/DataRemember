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
    
          dispatch(addUserData(data))
    
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
                <form onSubmit={deleteTypeHendler}>
                        <label htmlFor="username">User Name:</label>
                        <input
                          type="text" 
                          required 
                          minLength={5}
                          id="username"
                          placeholder="Enter User Name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email" 
                          required 
                          minLength={6}
                          id="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="newPassword">New Password: <i>o'zgartirmasangiz, bo'sh holida tashlab keting</i></label>
                        <input
                          type="password"
                          minLength={8}
                          id="newPassword"
                          placeholder="Enter New Password"
                          value={newpassword}
                          onChange={(e) => setNewpassword(e.target.value)}
                        />
                        <label htmlFor="newZipcode"> New Zip Code: <i>o'zgartirmasangiz, bo'sh holida tashlab keting</i></label>
                        <input
                          type="password"  
                          minLength={6}
                          id="newZipcode"
                          placeholder="Enter New Zip Code"
                          value={newzipCode}
                          onChange={(e) => setNewzipCode(e.target.value)}
                        />
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input
                          type="password" 
                          required 
                          minLength={8}
                          id="oldPassword"
                          placeholder="Enter Old Password"
                          value={oldpassword}
                          onChange={(e) => setOldpassword(e.target.value)}
                        />
                        <label htmlFor="oldZipcode">Old Zip Code:</label>
                        <input
                          type="text" 
                          required 
                          minLength={6}
                          id="oldZipcode"
                          placeholder="Enter Old Zip Code"
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
                          <button className="b_submit" type="submit">{isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :"Delete"}</button>
                          <button onClick={() => {setIsEditUserModalOpen(false)}} className="b_button" type="button">Close</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditUserModal;