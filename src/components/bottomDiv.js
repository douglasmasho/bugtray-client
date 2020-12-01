import React from "react";
import Bell from "../assets/bellicon.svg";

const BottomDiv = React.forwardRef((props, ref)=>{
    return(
        <div className="row bottomDiv" ref={ref}>
                    <div className="bottomDiv__2">
                    <p className="bigger-text bold-text bottomDiv--text">Invite</p>
                    </div>
           </div>
    ) 

}) 

export default BottomDiv