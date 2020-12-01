import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "./button";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect}  from "react-redux-firebase";
import moment from "moment";
import Loading from "./Loading";
import {bindActionCreators} from "redux";
import * as actionCreators from "../redux/actions"


class ManageBug extends Component{

    constructor(){
        super();
        this.deleteBug = this.deleteBug.bind(this);  
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalRef = React.createRef();   
    }
    

    deleteBug(){
        //this is the function where you delete the bug from firestore before you go back to the last page
        this.props.deleteBug(this.props.routeArgs.match.params.id);
        const {routeArgs} = this.props;
        const {history} = routeArgs;
        history.push("/allBugs");   
        this.closeModal();
    }

    openModal(){
        this.modalRef.current.classList.add("active");
    }

    closeModal(){
        this.modalRef.current.classList.remove("active");
    }

    render(){
        const {routeArgs} = this.props;
        const name = routeArgs.match.params.name;
        const id = routeArgs.match.params.id;
        // const bug = this.props.bugs ? this.props.bugs.find(bug=>bug.id === id) : null ;
        // const author = bug ? bug.author: "";
        if(this.props.bugs){
            return(
                <div className="screen">
                    {/* <div className="center-hrz--col u-margin-bottom-big">
                        <h1 className="screen__header u-margin-bottom white-text">Manage Bug</h1> 
                        <h3 className="white-text bigger-text u-margin-bottom">{name}: {id}</h3>
                        <h3 className="white-text bigger-text u-margin-bottom">Created by: {author}</h3>
                        <h3 className="white-text bigger-text">Created {moment(bug.createdAt.toDate()).calendar()}</h3>
                    </div> */}

                    <div className="center-hrz--col">
                       <Link to={`/assignToDevs/${name}/${id}`}><Button name="Assign to Developers" specClasses="button__yellow u-margin-bottom"></Button></Link>
                       <Link to={`/changeStatus/${name}/${id}`}><Button name="Change status" specClasses="button__yellow u-margin-bottom"></Button></Link>
                       <Link to={`/comments/${name}/${id}`}><Button name="Comments" specClasses="button__yellow u-margin-bottom"></Button></Link>
                       <Link to={`/screenshots/${name}/${id}`}><Button name="Screenshots" specClasses="button__yellow u-margin-bottom"></Button></Link>
                       <Button name="Delete Bug" specClasses="button__red u-margin-bottom" callBack={this.openModal}></Button>
                    </div>

                    <div className="modal" ref={this.modalRef} style={{width: "auto", padding: "5rem"}}>
                        <button className="close-button" onClick={this.closeModal}>&times;</button>
                        <h2 className="white-text bigger-text">Are you sure?</h2>
                        <div className="row" style={{justifyContent: "space-around"}}>
                            <Button name="Yes" specClasses="button__green" callBack={this.deleteBug}/>
                            <Button name="No" specClasses="button__red" callBack={this.closeModal}/>
                        </div>
                    </div>
                </div>
)
        }else{
            return  (<Loading/>)
        }

    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

const mapStateToProps = (state)=>{
    return {
        bugs: state.firestore.ordered.bugs
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(()=>["bugs"])
)(ManageBug)

