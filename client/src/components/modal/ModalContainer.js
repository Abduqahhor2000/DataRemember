import React from "react";
import {GrLinkNext} from "react-icons/gr"
import "./modalContainer.scss" 

const ModalContainer = ({setIsAddClientModalOpen, children}) => {
    return (
        <div className="modal_fon">
            <div className="modal_card">
                <div onClick={() => setIsAddClientModalOpen(false)} className="modal_exit_icon"><GrLinkNext/></div>
                {children}
            </div>
        </div>
    )
}
export default ModalContainer;