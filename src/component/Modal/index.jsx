import React from "react";

import { CloseOutlined } from '@material-ui/icons';
import "./style.css";

export default function Modal (props) {
    console.log(props,'props children')

        return (
        //   props.openModal &&(
            <div className="modal" onClick={()=> console.log('you clicked outside Modal madal class')}>
                <div className="modal-main" >  
                {props.title && <h2 className='modalTitle'>{props.title}</h2>}
                {props.closeModal && <span className='modalCloseBtn' onClick={()=>props.closeModal(true)}><CloseOutlined/></span>}
                <div className='modalBody'>{props.children}</div>
                <div className='modalFooter'>
                    {/* <button className="modal__closebtn" onClick={()=> props.closeModal()}> 
                        CLOSE
                    </button>  */}
                </div>
             </div> 
                {/* <button className="modal_btn" onClick={this.props.closeModal}> 
                    CLOSE
                </button>    */}
            </div>
        // )
   )
}
