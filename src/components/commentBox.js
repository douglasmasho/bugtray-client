import React, {Component, createRef} from "react";
import Button from "./button";
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";


class CommentBox extends Component{
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
        this.textAreaRef.current.value = "";
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

