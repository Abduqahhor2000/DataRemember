import React from "react";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./addClientTypeModal.scss"

const EditSaleModal = ({setIsEditSaleModalOpen, convertID, _productName, _productType, _price, _quality, setEffect, effect}) => {
  console.log(convertID, _productName, _productType, _price, _quality)
    const State_User = useSelector(state => state.user.user)
    const State_Client = useSelector(state => state.client.client)
    const [productName, setProductName] = useState(_productName)
    const [productType, setProductType] = useState(_productType)
    const [price, setPrice] = useState(_price)
    const [quality, setQuality] = useState(_quality)
    const [zipCode, setZipCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isTrue, setIsTrue] = useState(false)

    const editSaleHendler = async (e) => {
      console.log(convertID, productName, productType, State_Client._id, State_User.user._id, zipCode, price, quality)

        setError(false)
        setIsLoading(true)
        e.preventDefault();
        const config = {
            headers: {
                      "Content-Type": "application/json",
            },
        }
            try{
                const data = await axios.post(`/api/client/convert/${convertID}/update`,  
                 { sellerID: State_User.user._id,
                  clientID: State_Client._id,
                  convertType: "sales",
                  productName,
                  productType,
                  price, 
                  quality,
                  zipCode }, config)
              console.log(data)
              setEffect(effect +1)
              setIsLoading(false)
              setIsTrue(true)
              setTimeout(()=>{
                setIsTrue(false)
                setIsEditSaleModalOpen(false)
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
        <ModalContainer setIsModalOpen={setIsEditSaleModalOpen} >
            <div className="addType_row">
                <form onSubmit={editSaleHendler}>
                <label htmlFor="productName">Maxsulot Nomi:</label>
                        <input
                          type="text" 
                          required 
                          minLength={4}
                          id="productName"
                          placeholder="Maxsulot nomini kiriting..."
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                        <label htmlFor="productType">Maxsulot Navi:</label>
                        <select name="productType" id="productType" value={productType} onChange={(e) => setProductType(e.target.value)}>
                          <option value="N2">Oddiy nav</option>
                          <option value="N1">Saralangan nav</option>
                          <option value="N0">Oliy nav</option>
                          <option value="N3">Hamyonbob nav</option>
                        </select>
                        <label htmlFor="price">Narxi:</label>
                        <input
                          type="number" 
                          required 
                          id="price"
                          placeholder="Narxini kiriting..."
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="quality">Miqdori:</label>
                        <input
                          type="number" 
                          required 
                          id="quality"
                          placeholder="Miqdorini kiriting..."
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
                          <button onClick={() => {setIsEditSaleModalOpen(false)}} className="b_button" type="button">Yopish</button>
                        </div>
                      </form>
            </div>
        </ModalContainer>
    )
}

export default EditSaleModal;