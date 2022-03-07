import { useState, useEffect } from "react";
import axios from "axios";
import "./private.scss";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPayment } from 'react-icons/md'
import { AiFillShopping } from 'react-icons/ai'
import AddPaymentModal from "../modal/AddPaymentModal";
import AddSaleModal from "../modal/AddSaleModal";
import EditPaymentModal from "../modal/EditPaymentModal";
import EditSaleModal from "../modal/EditSaleModal";
import DeleteConvertModal from "../modal/DeleteConvertModal";

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
  const [converts, setConverts] = useState("")
  const [convertType, setConvertType] = useState("")
  const [productName, setProductName] = useState("")
  const [productType, setProductType] = useState("")
  const [quality, setQuality] = useState("")
  const [price, setPrice] = useState("")
  const [convertID, setConvertID] = useState("")

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
        setConverts(data.data);
      } catch (error) {
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
      </div>
      <div className="types">
        {!converts ?  
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
          return (
            <div className="type" key={item._id}>
              <div className="type_left">
                {
                  item.convertType === "sale" ? 
                    <>
                      <div className="type_icon"><MdPayment/></div>
                      <div className="type_name">{item.productType}</div>
                      <div className="type_name">{item.productName}</div>
                      <div className="type_name">{item.price}</div>
                      <div className="quality">{item.quality}</div>
                      <div className="quality">{item.createAt}</div>
                    </> :
                    <>
                      <div className="type_icon"><MdPayment/></div>
                      <div className="quality">{item.quality}</div>
                      <div className="quality">{item.createAt}</div>
                    </>
                }
              </div>
              <div className="type_buttons">
                <button type="button" className="edit_type"
                  onClick={ () => {
                      setConvertID(item._id);
                      setProductName(item?.productName); 
                      setProductType(item?.productType); 
                      setConvertType(item?.convertType); 
                      setQuality(item?.quality); 
                      setPrice(item?.price);
                      if(item.productType === "sale") {setIsEditSaleModalOpen(true)}
                      else {setIsEditPaymentModalOpen(true)}
                  }}
                >Edit</button>
                <button onClick={() => {setConvertID(item._id); setQuality(item.quality); setIsDeleteConvertModalOpen(true)}} type="button" className="delete_type">Delete</button>
              </div>
            </div>
          )
        })}
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
                          convertType={convertType}
                          productName={productName}
                          productType={productType}
                          quality={quality}
                          price={price}
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
                            setEffect={setEffect} 
                            effect={effect}
                          /> : null }
      </>)
};

export default Client;