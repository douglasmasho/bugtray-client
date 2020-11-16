import React,{Component} from "react";
import Comment from "./comment";
import CommentBox from "./commentBox";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";


class CommentPage extends Component{

    componentDidUpdate(prevProps, prevState){
        console.log(this.props.data);
        this.props.scrollToBottom();
    }

    render(){
        console.log(this.props.comments)
        let {routeArgs} = this.props;
        let name = routeArgs.match.params.name;
        let id = routeArgs.match.params.id;
        let commentsArr;
        this.props.comments && this.props.comments.length > 0 ? commentsArr = this.props.comments[0].comments : commentsArr = [];
        // let newArr = commentsArr.filter(comment=> comment.id === name + id);
        console.log(commentsArr);
        return(
            <div className="screen center-hrz--col">
                <h1 className="screen__header u-margin-bottom white-text">comments</h1>
                <h3 className="white-text normal-text u-margin-bottom-big">{name}-{id}</h3>
                {
                    commentsArr.map((comment)=>(<Comment key={comment.commentID} text={comment.comment} name={comment.authorName} imgSrc={comment.imgSrc} timeStamp={comment.timeStamp}/>))
                }
                <CommentBox  {...this.props}/>
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
        comments: state.firestore.ordered.comments,
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {collection: "comments", doc: props.routeArgs.match.params.id}
    ])
)
(CommentPage)