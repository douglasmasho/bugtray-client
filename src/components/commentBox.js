import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import Button from "./button";
import shortid from "shortid";


export default class CommentBox extends Component{
    constructor(){
        super();
        this.postComment = this.postComment.bind(this);
    }

    textAreaRef = createRef();

    postComment(){
        const {routeArgs} = this.props;
        const projectname = routeArgs.match.params.name;
        const comment = document.querySelector("#new-comment").value;
        const id = routeArgs.match.params.id;
        if(comment){
            const commentObj = {
                id: projectname + id,
                comment,
                commentID: shortid.generate(),
            }
            this.props.addComment(commentObj);
        }
    }

    componentDidMount(){
        this.textAreaRef.current.addEventListener('input', autoResize, false); 
        function autoResize() { 
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px'; 
        // props.middleDiv.scrollTo(0, props.middleDiv.scrollHeight);
     } 
    }
    render(){

        

        return (
            <div className="comment--container--input u-margin-top-big comment__bottom">
                <textarea name="new-comment" id="new-comment" placeholder="add a comment" ref={this.textAreaRef}></textarea>
                <Button name="Send" specClasses="button__green comment--button" callBack={()=>{
                    this.postComment()
                }}/>
            </div>
        )
    }
}