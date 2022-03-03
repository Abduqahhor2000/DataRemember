import React from "react";
import {GrLinkNext} from "react-icons/gr"
import "./modalContainer.scss" 

const ModalContainer = ({setIsModalOpen, children}) => {
    return (
        <div className="modal_fon" >
            <div onClick={() => setIsModalOpen(false)} className="modal_f"></div>
            <div className="modal_card">
                <div onClick={() => setIsModalOpen(false)} className="modal_exit_icon"><GrLinkNext/></div>
                {children}
            </div>
        </div>
    )
}
export default ModalContainer;