import React, {Component} from "react";
// import {Link} from "react-router-dom";
// import Button from "./button";
import MemberCard from "./memberCard";
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
// import { nanoid } from 'nanoid';




class AddBugForm extends Component{
    constructor(){
        super();
        this.addBug = this.addBug.bind(this);
        // this.contAddBug = this.contAddBug(this)
       this.errorText = React.createRef();

    }


    componentDidMount(){
        console.log(this.props.addBug);

        this.props.getImage(this.props.auth.uid);
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props){
            if(this.props.profile.teamID && this.props.teamUsers.length === 0){
                this.props.getTeamUsers(this.props.profile.teamID)
            }        
        }
    }
    state = {
        projectName: "",
        bugTitle: "",
        deadline: "",
        devObjs: [],
    }

    handleChange = e =>{
        this.setState({
            [e.target.id] : e.target.value
        })
        console.log(this.state)
    }

    addBug = (e)=>{
        e.preventDefault();
        //check to see if a checkbox is selected;
        const selectedBoxes = Array.from(document.querySelectorAll(".input-checkbox")).filter(el=>(el.checked));
        if(selectedBoxes.length  === 0){
            this.errorText.current.style.display = "block";
            setTimeout(()=>{
            this.errorText.current.style.display = "none";
            }, 3000)
        }else{
            const usersArr = selectedBoxes.map((el)=>{
                                            return JSON.parse(el.dataset.userobj)
                });
            this.props.addBug({deadLine: this.state.deadline, name: this.state.projectName, /*id random unique number*/teamID: this.props.profile.teamID,title: this.state.bugTitle, status: "under review", devs: usersArr, createdAt: new Date(), author: this.props.profile.name});
            this.props.history.push("/allBugs");
        }


    }

    render(){
        return (
            <div>
                <div className="center-hrz">
                   <h1 className="screen__header u-margin-bottom white-text">Add a Bug</h1>
                </div>
                <form id="first-form" onSubmit={this.addBug}  className="u-margin-top-big">
                <div className="center-hrz--col">
                    <div className="input-group">
                         <input type="text" className="input-text" id="projectName" placeholder="project name*" onChange={this.handleChange} required/>
                         <label htmlFor="project-name" className="input-label" value={this.state.projectName}>Project name*</label>
                    </div>

                    <div className="input-group">
                         <input type="text" className="input-text" id="bugTitle" placeholder="Bug title*" onChange={this.handleChange}  value={this.state.bugTitle} required/>
                         <label htmlFor="bug-title" className="input-label">Bug title*</label>
                    </div>

                    <div className="input-group">
                        <p className="white-text bigger-text">Deadline*</p>
                        <input type="date" className="input-date" id="deadline" onChange={this.handleChange} required/>
                    </div>

                    <div className="center-hrz--col u-margin-top" style={{width: "100%"}}>
                            <div className="center-hrz">
                                <h2 className="u-margin-bottom white-text bigger-text">Assign to devs</h2>
                            </div>

                            {this.props.teamUsers.length > 0 ? this.props.teamUsers.map((dev,index)=>(
                                <MemberCard checkbox="visible" checkboxName="assignedDevs" key={dev.id} dev={dev}/>
                            )) : <p className="white-text u-margin-bottom">Loading</p>}
                    </div>

                    <div className="comment--container--input u-margin-top-big">
                        <img src={this.props.imageSrc} alt="user" className="comment--pic"/>
                        <textarea name="new-comment" id="new-comment" cols="30" rows="10" placeholder="Write a brief description of the bug..."></textarea>
                    </div>




                </div>
                <div className="center-hrz--col">
                <p style={{display: "none"}} ref={this.errorText} className="bigger-text red-text u-margin-bottom">Please assign the bug to at least one dev</p>
                  <input type="submit" className="button button__green" value="add bug"/>
                </div>
            </form>
            </div>

        )
    }
}


const mapStateToProps = state=>({
    devs: state.devs,
    profile: state.firebase.profile,
    teamUsers: state.teamUsers,
    imageSrc: state.imageSrc,
    auth: state.firebase.auth
})

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddBugForm);