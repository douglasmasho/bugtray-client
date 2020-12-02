import React, {useEffect} from "react";
import moment from "moment";
import Bin from "../assets/trash.svg"
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";


const Comment = (props)=>{

    const deleteComment = ()=>{
        props.deleteComment(props.commentID, props.bugID)
    }


        return (
            <div className="comment--container">   
                <div className="comment--pic" style={{backgroundImage: `url(${props.imgSrc})`}}></div>
               <div className="comment--title">{props.name} | <span className="u-margin-right"> {moment(props.timeStamp.toDate()).calendar()}</span>{props.uid === props.authorID ? <img src={Bin} alt="trash" className="comment--delete" onClick={deleteComment} /> : null}</div>
                <div className="comment--text">
                  <p>{props.text}</p>
                </div>
            </div>
        )
    
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(Comment)

