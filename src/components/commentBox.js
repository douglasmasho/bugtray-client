import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import Button from "./button";


export default class CommentBox extends Component{
    constructor(){
        super();
        this.postComment = this.postComment.bind(this);
    }

    postComment(){
        const {routeArgs} = this.props;
        const projectname = routeArgs.match.params.name;
        const comment = document.querySelector("#new-comment").value;
        const id = routeArgs.match.params.id;
        if(comment){
            const commentObj = {
                id: projectname + id,
                comment
            }
            this.props.addComment(commentObj);
        }
    }
    render(){
        

        return (
            <div className="comment--container--input u-margin-top-big">
                <img src={Rando} alt="user" className="comment--pic"/>
                <textarea name="new-comment" id="new-comment" cols="30" rows="10" placeholder="add a comment"></textarea>
                <Button name="add Comment" specClasses="button__green comment--button" callBack={()=>{
                    this.postComment()
                }}/>
            </div>
        )
    }
}