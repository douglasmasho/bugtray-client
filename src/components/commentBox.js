import React, {Component, createRef} from "react";
import Button from "./button";
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import Down from "../assets/arrow-down.svg"


class CommentBox extends Component{
    constructor(){
        super();
        this.postComment = this.postComment.bind(this);
    }

    textAreaRef = createRef();
    downRef = createRef()

    componentDidUpdate(){
        this.downRef.current.style.opacity = "1";
    }

    componentWillUnmount(){
        const element = document.querySelector("#dashboard");
        console.log("removed")
        document.querySelector("#dashboard").removeEventListener("scroll", ()=>{
            if(element.clientHeight + element.scrollTop === element.scrollHeight){
                this.downRef.current.style.opacity = "0";
            }else{
                this.downRef.current.style.opacity = "1";
            }
        }, true)
    }



    componentDidMount(){
        this.textAreaRef.current.addEventListener('input', autoResize, false); 
        function autoResize() { 
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px'; 
     } 

     const element = document.querySelector("#dashboard");
        this.downRef.current.style.opacity = "1";

        if(document.querySelector("#dashboard")){
            document.querySelector("#dashboard").addEventListener("scroll", ()=>{
                if(this.downRef.current){
                    if(element.clientHeight + element.scrollTop === element.scrollHeight){
                        this.downRef.current.style.opacity = "0";
                    }else{
                        this.downRef.current.style.opacity = "1";
                    }
                }
            },true)
        }
    }


    postComment(){
        const {routeArgs} = this.props;
        const comment = this.textAreaRef.current.value;
        const id = routeArgs.match.params.id;
        this.textAreaRef.current.value = "";
        this.textAreaRef.current.style.height = 'auto'; 

        if(comment){
            const commentObj = {
                comment,
                commentID: nanoid(9),
                authorID: this.props.auth.uid,
                authorName: this.props.profile.name,
                timeStamp: new Date(),
            }
            this.props.addComment(commentObj, id);
        }
    }
    render(){
        console.log(document.querySelector("#dashboard"))
        return (
            <div className="comment--container--input u-margin-top-big comment__bottom">
                <textarea name="new-comment" id="new-comment" placeholder="add a comment" ref={this.textAreaRef}></textarea>
                <Button name="Send" specClasses="button__green comment--button" callBack={()=>{
                    this.postComment()
                }}/>
               <button className="comment--down" onClick={this.props.scrollToBottom} ref={this.downRef}><img src={Down} alt=""/></button>
            </div>
        )
    }
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

