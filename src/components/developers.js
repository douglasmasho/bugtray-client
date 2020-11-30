import React, {useEffect} from 'react';
import {connect} from "react-redux";
// import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import MemberCard from "./memberCard";


const Developers = (props) => {
    const {profile} = props;

    useEffect(()=>{
        if(profile.teamID && props.teamUsers.length === 0){
            props.getTeamUsers(profile.teamID)
        }
    },[profile])

      if(!props.auth.uid){
           return <Redirect to="/"/>
        }
        return ( 
            <div className="screen">
                <div className="center-hrz--col">
                    <h1 className="screen__header u-margin-bottom white-text">Developers</h1>
                    <h3 className="white-text bigger-text u-margin-bottom">TeamID: {props.profile.teamID}</h3>
                </div>  
                <div className="center-hrz--col u-margin-top-big">
                    {props.teamUsers.length > 0 ? props.teamUsers.map((dev, index)=>(
                    <MemberCard checkbox="none" key={dev.id} dev={dev}/>
                    )): <p className="white-text">Loading</p>}
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
    connect(mapStateToProps, mapDispatchToProps)
)(Developers);