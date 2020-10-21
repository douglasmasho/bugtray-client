import React, { useEffect, useRef, useState } from 'react';
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import Bugs from "./bugs";
import {Link} from "react-router-dom"
import Button from "./button";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";



const AllBugsDB = (props) => {

    useEffect(()=>{
        console.log("i rendered");
    })

    useEffect(()=>{
        if(props.profile.teamID){
            props.getTeamBugs(props.profile.teamID);
        }
    }, [props.profile])

    if(!props.auth.uid){
        return <Redirect to="/"/>
    }
    return ( 
        <div className="screen">
            <div className="center-hrz">
                 <h1 className="screen__header u-margin-bottom white-text">All bugs</h1>  
            </div>
            <div className="center-hrz">
        <Link to="/addBug"> <Button name="Add Bug" specClasses="u-margin-bottom button__green"/> </Link> 
        </div>  
            <BugsHeader/>
        {/* the components(array) that represent individual bugs will come here. */}
        <div>
            {props.teamBugs.map((bug, index)=>(
                <Bugs bugObj={bug} key={bug.id}/>
            ))}
        </div>
        <div className="center-hrz">
        {/* <Link to="/addBug"> <Button name="Add Bug" specClasses="u-margin-top-big button__green"/> </Link>  */}
        </div>  
    </div>
     );
}

const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        bugs: state.firestore.data.bugs,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        teamBugs: state.teamBugs
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(()=>["teamBugs", "bugs"])
)(AllBugsDB);
//true means that it will not re-render