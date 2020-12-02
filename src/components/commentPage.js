import React,{Component} from "react";
import Comment from "./comment";
import CommentBox from "./commentBox";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import JustAnimation from "./JustAnimation";


class CommentPage extends Component{

    // componentDidUpdate(prevProps, prevState){
    //     this.props.scrollToBottom();
    // }

    render(){
        let {routeArgs} = this.props;
        let name = routeArgs.match.params.name;
        let id = routeArgs.match.params.id;
        let commentsArr;
        this.props.comments && this.props.comments.length > 0 ? commentsArr = this.props.comments[0].comments : commentsArr = [];
        // let newArr = commentsArr.filter(comment=> comment.id === name + id);
        return(
            <div className="screen center-hrz--col" style={{position: "relative"}}>
                <h1 className="screen__header u-margin-bottom white-text">comments</h1>
                <h3 className="white-text normal-text u-margin-bottom-big">{name}-{id}</h3>
                {
                   this.props.comments  ? this.props.comments.length > 0 ? commentsArr.map((comment)=>(<Comment key={comment.commentID} commentID={comment.commentID} text={comment.comment} name={comment.authorName} imgSrc={comment.imgSrc} timeStamp={comment.timeStamp} authorID={comment.authorID} uid={this.props.auth.uid} bugID={id}/> )) : <p className="white-text bigger-text">There are no comments</p> 
                   : <JustAnimation/> 
                }
               {document.querySelector("#dashboard") ? <CommentBox  {...this.props} scrollToBottom={this.props.scrollToBottom}/> : null} 
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
        comments: state.firestore.ordered.comments
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {collection: "comments", doc: props.routeArgs.match.params.id}
    ])
)
(CommentPage)