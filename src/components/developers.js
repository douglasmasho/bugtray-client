import React, {useEffect} from 'react';
import Button from "./button";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import MemberCard from "./memberCard";


const Developers = (props) => {
    useEffect(()=>{
        console.log("i rendered");
        console.log(props.teamUsers)
    })

    useEffect(()=>{
        if(props.profile.teamID){
            props.getTeamUsers(props.profile.teamID)
        }
    },[props.profile])

      if(!props.auth.uid){
           return <Redirect to="/"/>
        }
        return ( 
            <div className="screen">
                <div className="center-hrz">
                    <h1 className="screen__header u-margin-bottom white-text">Developers</h1>
                </div>  
                <div className="center-hrz--col u-margin-top-big">
                    {props.teamUsers.map((dev, index)=>(
                    <MemberCard checkbox="none" key={dev.id} dev={dev}/>
                    ))}
                </div>
            </div>
        )
}
 

const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        teamUsers: state.teamUsers
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(()=>["bugs"])
)(Developers);