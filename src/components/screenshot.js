import React, {} from "react";
import moment from "moment";
import Bin from "../assets/trash.svg";
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";

import {Magnifier} from "react-image-magnifiers";
import { useEffect } from "react";



const Screenshot =React.memo((props)=>{

   const  deleteScreenshot =(e)=>{
        props.deleteScreenshot(props.screenshotID, props.bugID)
    }

        return(
            <div className="screenshot--container">
            {/* <img src={props.authorPic} alt="user" className="screenshot--pic"/> */}
            <div className="screenshot--pic" style={{backgroundImage: `url(${props.authorPic})`}}></div>
            <div className="screenshot--title">{props.authorName} | <span>{moment(props.timeStamp.toDate()).calendar()}</span>{props.uid === props.authorID ? <img src={Bin} alt="trash" className="screenshot--delete"  onClick={deleteScreenshot}/> : null}</div>
             <div className="center-hrz">
              <Magnifier imageSrc={props.screenshot} imageAlt="" style={{width: "80%"}} dragToMove={false}/>
             </div>
            {/* <img src={props.screenshot} alt="" data-zoomable className="screenshot--screenshot u-margin-bottom img-zoomable"/> */}
              <p className="screenshot--note">Notes:<br></br>{props.notes}</p>
            </div>
        )

})


const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(Screenshot)