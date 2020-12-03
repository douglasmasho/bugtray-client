import React, {useEffect, useRef} from "react";
import Button from "./button";
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import Down from "../assets/arrow-down.svg";
import { useCallback } from "react";


const CommentBox =(props)=>{
    const textAreaRef = useRef(),
    downRef = useRef();

    const scrollListener = useCallback(()=>{
     const element = document.querySelector("#dashboard");

        if(downRef.current){            if(element.clientHeight + element.scrollTop === element.scrollHeight){
                downRef.current.style.opacity = "0";
            }else{
                downRef.current.style.opacity = "1";
            }
        }
    }, [])

    
    useEffect(()=>{
        downRef.current.style.opacity = "1";
    })


    useEffect(()=>{
        textAreaRef.current.addEventListener('input', autoResize, false); 
        function autoResize() { 
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px'; 
      } 

     const element = document.querySelector("#dashboard");
        downRef.current.style.opacity = "1"
        element.addEventListener("scroll", scrollListener)
        
        return ()=>{
            console.log("removed")
            element.removeEventListener("scroll", scrollListener)
        }

    }, [])


    const postComment =()=>{
        const {routeArgs} = props;
        const comment = textAreaRef.current.value;
        const id = routeArgs.match.params.id;
        textAreaRef.current.value = "";
        textAreaRef.current.style.height = 'auto'; 
        if(comment){
            const commentObj = {
                comment,
                commentID: nanoid(9),
                authorID: props.auth.uid,
                authorName: props.profile.name,
                timeStamp: new Date(),
            }
            props.addComment(commentObj, id);
        }
    }

        return (
            <div className="comment--container--input u-margin-top-big comment__bottom">
                <textarea name="new-comment" id="new-comment" placeholder="add a comment" ref={textAreaRef}></textarea>
                <Button name="Send" specClasses="button__green comment--button" callBack={()=>{
                    postComment()
                }}/>
               <button className="comment--down" onClick={props.scrollToBottom} ref={downRef}><img src={Down} alt=""/></button>
            </div>
        )
    
}



const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state =>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);

