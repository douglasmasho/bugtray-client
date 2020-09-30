import React,{Component} from "react";
import Comment from "./comment";
import CommentBox from "./commentBox";


export default class CommentPage extends Component{

    render(){
        console.log(this.props.comments)
        let {routeArgs} = this.props;
        let name = routeArgs.match.params.name;
        let id = routeArgs.match.params.id;
        let commentsArr = this.props.comments;
        let newArr = commentsArr.filter(comment=> comment.id === name + id);
        return(
            <div className="screen center-hrz--col">
                <h1 className="screen__header u-margin-bottom white-text">comments</h1>
                <h3 className="white-text normal-text u-margin-bottom-big">{name}-{id}</h3>
                {/* <Comment text="blablabla"/>
                <Comment text="blablabla"/> */}
                {
                    newArr.map((comment)=>(<Comment key={comment.commentID} text={comment.comment}/>))
                }
                <CommentBox  {...this.props}/>
            </div>
        )
    }
}