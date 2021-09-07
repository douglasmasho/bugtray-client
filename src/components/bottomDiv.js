import React, {useRef} from "react";
import Bell from "../assets/bellicon.svg";

const BottomDiv = React.forwardRef((props, ref)=>{
    const modalRef = useRef();
    const openModal = ()=>{
        modalRef.current.classList.add("active");
        console.log("to the base");
    }
    const closeModal = ()=>{
        modalRef.current.classList.remove("active");
    }
    return(
        <div className="row bottomDiv" ref={ref}>
                    <button className="bottomDiv__2" onClick={openModal} style={{cursor: "pointer"}}>
                    <p className="bigger-text bold-text bottomDiv--text">Invite</p>
                    </button>
                    <div className="modal" ref={modalRef} style={{width: "auto", padding: "5rem"}}>
                    <button className="close-button" onClick={closeModal}>&times;</button>
                    <h3 className="white-text bigger-text u-margin-bottom">Invite a developer</h3>
                    <div className="center-hrz">
                    <h1 className="white-text">{props.profile.hasOwnProperty("teamID") ? props.profile.teamID : "loading"}</h1>

                    </div>
                     <p className="white-text normal-text">To invite a developer to your team, copy and send them your team's ID above. They should use the ID when signing up to Bugtray.</p>
                    </div>
           </div>
    ) 

}) 

export default BottomDiv