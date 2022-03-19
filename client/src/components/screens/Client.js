import { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import "./client.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPayment } from 'react-icons/md'
import { FcDebt, FcMoneyTransfer, FcSalesPerformance, FcBullish } from 'react-icons/fc'
import {GrPrevious} from "react-icons/gr"
import { AiFillShopping } from 'react-icons/ai'
import AddPaymentModal from "../modal/AddPaymentModal";
import AddSaleModal from "../modal/AddSaleModal";
import EditPaymentModal from "../modal/EditPaymentModal";
import EditSaleModal from "../modal/EditSaleModal";
import DeleteConvertModal from "../modal/DeleteConvertModal";
import { farmatDate, farmatNumberAndString, farmatNumberStr } from "./helperFuntion";
import EditClientModal from "../modal/EditClientModal";
import DeleteClientModal from "../modal/DeleteClientModal";
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

const Client = () => {
  const State_User = useSelector(state => state.user.user)
  const State_Client = useSelector(state => state.client.client)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [effect, setEffect] = useState("");
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false)
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)
  const [isEditSaleModalOpen, setIsEditSaleModalOpen] = useState(false)
  const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false)
  const [isDeleteConvertModalOpen, setIsDeleteConvertModalOpen] = useState(false)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false)
  const [converts, setConverts] = useState([])
  const [productName, setProductName] = useState("")
  const [productType, setProductType] = useState("")
  const [quality, setQuality] = useState("")
  const [price, setPrice] = useState("")
  const [convertID, setConvertID] = useState("")
  const [getAllConverts, setGetAllConverts] = useState(false)
  const [stat_client, setStat_client] = useState({sales: 0, payment: 0})

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
        setConverts(data.data.data.reverse());
        setGetAllConverts(true)
      } catch (error) {
        setGetAllConverts(true)
        setError("You are not authorized please login");
      }
    };

    const getStat = async function (){
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      try {
        const data = await axios.post("/api/client/stat_client",{
          clientID: State_Client._id,
        }, config);
        console.log(data, "uuugfgdfxxghu")
        setStat_client(data.data.data);
      } catch (error) {
        // setGetAllConverts(true)
        console.log(error)
      }
    };
    

    fetchPrivateDate();
    getStat()
  }, [navigate, State_User, State_Client, effect]);
  return ( error ? <b>{error}</b> : <>
      <div className="user">
        <div className="panel">    
          <div onClick={()=>{navigate("/client-type")}} style={{"cursor":"pointer"}} className="name">
              <span style={{"margin": "-5px 20px 0 15px"}} className="icon"><GrPrevious/></span>     
          </div> 
          <div className="buttons">
              <span className="text" style={{"marginRight":"7px"}}>{State_Client.fullName}</span>
              <UncontrolledButtonDropdown style={{"marginRight":"10px"}}>
                <DropdownToggle caret style={{"fontSize":"12px", "padding": "4px 3px 4px" }}>
                  <AiFillShopping style={{"fontSize" : "20px"}}/>
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem onClick={()=>{setIsAddSaleModalOpen(true)}} style={{"fontSize" : "12px"}}>
                    Sotuvni qo'shish
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>{setIsAddPaymentModalOpen(true)}} style={{"fontSize" : "12px"}}>
                    Kirimni qo'shish
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem  onClick={() => {setIsEditClientModalOpen(true)}} style={{"fontSize" : "12px"}}>
                    Mijoz malumotlarini yangilash
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {setIsDeleteClientModalOpen(true)}} style={{"fontSize" : "12px"}}>
                    Mijozni o'chirish
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
          </div>
        </div>
        <div className="types">
            <div className={`type`} key="hisob">
                <div className="type_left1" style={{"width": "100%"}}>
                    <div className="payment"style={{"width": "100%"}}> 
                        <div className="icon" style={{"width": "100%", "flexWrap": "wrap"}}>      
                          <div className="number" style={{"width": "50%", "fontSize" : "14px"}}><FcMoneyTransfer/> &nbsp; Haq: {farmatNumberAndString(stat_client?.sales - stat_client?.payment, 3)} &nbsp; &nbsp;</div>
                          <div className="number" style={{"width": "50%", "fontSize" : "14px"}}><FcDebt/> &nbsp; Qarz: {farmatNumberAndString(stat_client?.payment  - stat_client?.sales, 3)} &nbsp; &nbsp;</div>
                          <div className="number" style={{"width": "50%", "fontSize" : "14px"}}><FcBullish/> &nbsp; Sotuv: {farmatNumberAndString(stat_client?.sales, 3)} &nbsp;  &nbsp;</div>
                          <div className="number" style={{"width": "50%", "fontSize" : "14px"}}><FcSalesPerformance/> &nbsp; Kirim: {farmatNumberAndString(stat_client?.payment, 3)}</div>  
                        </div>
                    </div>
                </div>
            </div>        
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
                  <UncontrolledButtonDropdown style={{"marginRight": "5px"}}>
                      <DropdownToggle caret style={{"fontSize":"12px", "padding": "3px 7px 2px 5px" }}> 
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem  
                            onClick={ () => {
                                setConvertID(item._id); 
                                setProductName(item?.sales?.productName); 
                                setProductType(item?.sales?.productType); 
                               
                                setPrice(item?.sales?.price);
                                if(item.convertType === "sales") {
                                  setIsEditSaleModalOpen(true); 
                                  setQuality(item?.sales?.quality); 
                                }
                                else {
                                  setIsEditPaymentModalOpen(true); 
                                  setQuality(item?.payment?.quality)
                                }
                            }} style={{"fontSize":"12px"}} >
                              Yangilash
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem 
                            onClick={() => {
                                setConvertID(item._id); 
                                setIsDeleteConvertModalOpen(true)
                                if(item.convertType === "sales"){
                                  setQuality(item.sales.quality); 
                                }else{
                                  setQuality(item.payment.quality)
                                }
                            }}  style={{"fontSize":"12px"}} >
                              O'chirish
                        </DropdownItem>
                      </DropdownMenu>
                  </UncontrolledButtonDropdown>
              </div>
            </div>
          )
        })}
      </div>
      </div>
     
      { isAddSaleModalOpen ?  <AddSaleModal
                            setIsAddSaleModalOpen={setIsAddSaleModalOpen} 
                            setEffect={setEffect} 
                            effect={effect}
                        /> : null }
      { isAddPaymentModalOpen ?  <AddPaymentModal
                            setIsAddPaymentModalOpen={setIsAddPaymentModalOpen} 
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
                          _quality={quality}
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
      { isEditClientModalOpen ? <EditClientModal
                            setIsEditClientModalOpen={setIsEditClientModalOpen} 
                            setEffect={setEffect} 
                            effect={effect}
                          /> : null }
      { isDeleteClientModalOpen ? <DeleteClientModal
                            setIsDeleteClientModalOpen={setIsDeleteClientModalOpen}
                            setEffect={setEffect} 
                            effect={effect}
                          /> : null }                    
      </>)
};

export default Client;