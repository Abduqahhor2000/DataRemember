import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import "./client.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPayment } from 'react-icons/md'
import { AiFillShopping } from 'react-icons/ai'
import AddPaymentModal from "../modal/AddPaymentModal";
import AddSaleModal from "../modal/AddSaleModal";
import EditPaymentModal from "../modal/EditPaymentModal";
import EditSaleModal from "../modal/EditSaleModal";
import DeleteConvertModal from "../modal/DeleteConvertModal";
import { farmatDate, farmatNumberStr } from "./helperFuntion";

const Client = () => {
  const State_User = useSelector(state => state.user.user)
  // const State_Type = useSelector(state => state.typename.typename)
  const State_Client = useSelector(state => state.client.client)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [effect, setEffect] = useState("");
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false)
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)
  const [isEditSaleModalOpen, setIsEditSaleModalOpen] = useState(false)
  const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false)
  const [isDeleteConvertModalOpen, setIsDeleteConvertModalOpen] = useState(false)
  const [converts, setConverts] = useState([])
  const [convertType, setConvertType] = useState("")
  const [productName, setProductName] = useState("")
  const [productType, setProductType] = useState("")
  const [quality, setQuality] = useState("")
  const [price, setPrice] = useState("")
  const [convertID, setConvertID] = useState("")
  const [getAllConverts, setGetAllConverts] = useState(false)

  useEffect(() => {
    const fetchPrivateDate = async () => {
      if(!State_User.token){
        navigate("/login")
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      try {
        const data = await axios.post("/api/client/convert/get",{
          sellerID: State_User.user._id,
          clientID: State_Client._id,
        }, config);
        console.log(data)
        setConverts(data.data.data);
        setGetAllConverts(true)
      } catch (error) {
        setGetAllConverts(true)
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [navigate, State_User, State_Client, effect]);
  return ( error ? <b>{error}</b> : <>
      <div className="user">
        <div className="panel">
          <div className="name">
            <span className="icon"><AiFillShopping/></span>
            <span className="text">{State_Client.fullName}</span>
          </div>
          <div className="buttons">
            <div className="add_type">
              <button onClick={()=>{setIsAddSaleModalOpen(true)}} type="button">+Add Sale</button>
            </div>
            <div className="add_type">
              <button onClick={()=>{setIsAddPaymentModalOpen(true)}} type="button">+Add Payment</button>
            </div>
          </div>
        </div>
        <div className="types">
        {!getAllConverts ?  
        <div className="loadingio-spinner-spinner-0udingbvrrcc">
          <div className="ldio-3opmt1mq4co">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div> : converts.map(item => {
          console.log(item)
          return (
            <div className={`type ${item.convertType === "sales" ? "sales_card" : "payment_card"}`} key={item._id}>
              <div className="type_left1">
                {
                  item.convertType === "sales" ? 
                    <>
                      <div className="payment1">  
                        <div className="payment">
                            <div className="icon">
                              <MdPayment/>
                              <div className="number"> &nbsp; {farmatNumberStr(item.sales.price * item.sales.quality)}</div>
                            </div>
                            <div className="date">{farmatDate(item.createAt)}</div>
                          </div>
                        <div className="blok1">
                          <div className="tur">
                            <div className="type_name3">{item.sales.productName}</div>
                            <div className="type_name3">{
                                item.sales.productType === "N0" ? "Oliy nav"
                              : item.sales.productType === "N1" ? "Saralangan nav"
                              : item.sales.productType === "N2" ? "Oddiy nav"
                              : item.sales.productType === "N3" ? "Hamyonbob nav" : null
                            }</div>
                          </div>
                          <div className="narxlar">
                            <div className="type_name1">{item.sales.price} so'm</div>
                            <div className="type_name2">{item.sales.quality} kg</div>
                          </div> 
                        </div>
                      </div>
                      <div className="narxlar1">
                            <div className="type_name1">{item.sales.price} so'm</div>
                            <div className="type_name2">{item.sales.quality} kg</div>
                      </div> 
                    </> :
                    <>
                      <div className="payment"> 
                        <div className="icon">
                          <MdPayment/>
                          <div className="number"> &nbsp; {farmatNumberStr(item.payment.quality)}</div>  
                        </div>
                        <div className="date">{farmatDate(item.createAt)}</div>
                      </div>
                    </>
                }
              </div>
              <div className="type_buttons">
                <button type="button" className="edit_type"
                  onClick={ () => {
                      setConvertID(item._id); 
                      setProductName(item?.sales?.productName); 
                      setProductType(item?.sales?.productType); 
                      setConvertType(item?.convertType); 
                     
                      setPrice(item?.sales?.price);
                      if(item.convertType === "sales") {
                        setIsEditSaleModalOpen(true); 
                        setQuality(item?.sales?.quality); 
                      }
                      else {
                        setIsEditPaymentModalOpen(true); 
                        setQuality(item?.payment?.quality)
                      }
                  }}
                >Edit</button>
                <button type="button" className="delete_type" 
                  onClick={() => {
                    setConvertID(item._id); 
                    setIsDeleteConvertModalOpen(true)
                    if(item.convertType === "sales"){
                      setQuality(item.sales.quality); 
                    }else{
                      setQuality(item.payment.quality)
                    }
                  }} 
                >Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      </div>
     
      { isAddSaleModalOpen ?  <AddSaleModal
                            setIsAddSaleModalOpen={setIsAddSaleModalOpen} 
                            convertType={convertType}
                            setEffect={setEffect} 
                            effect={effect}
                        /> : null }
      { isAddPaymentModalOpen ?  <AddPaymentModal
                            setIsAddPaymentModalOpen={setIsAddPaymentModalOpen} 
                            convertType={convertType}
                            setEffect={setEffect} 
                            effect={effect}
                        /> : null }
      { isEditSaleModalOpen ? <EditSaleModal
                          setIsEditSaleModalOpen={setIsEditSaleModalOpen} 
                          _productName={productName}
                          _productType={productType}
                          _quality={quality}
                          _price={price}
                          convertID={convertID}
                          setEffect={setEffect} 
                          effect={effect}
                        /> : null }
      { isEditPaymentModalOpen ? <EditPaymentModal
                          setIsEditPaymentModalOpen={setIsEditPaymentModalOpen} 
                          convertType={convertType}
                          quality={quality}
                          convertID={convertID}
                          setEffect={setEffect} 
                          effect={effect}
                        /> : null }
      { isDeleteConvertModalOpen ? <DeleteConvertModal
                            setIsDeleteConvertModalOpen={setIsDeleteConvertModalOpen}
                            convertID ={convertID}
                            quality={quality}
                            setEffect={setEffect} 
                            effect={effect}
                          /> : null }
      </>)
};

export default Client;