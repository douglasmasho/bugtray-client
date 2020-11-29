import React from 'react';
import Bugs from "./bugs";
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import {Redirect} from "react-router-dom";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import { useEffect } from 'react';
import {nanoid} from "nanoid"





const MyBugsDB = (props) => {
    // console.log(props.myBugs)
    useEffect(()=>{
        if(props.myBugs){
            console.log(props.myBugs[0].projectArr)
        }
        console.log(props.myBugs);
    })
    if(!props.auth.uid){
        return <Redirect to="/"/>
    }
    // useEffect(()=>{

    // }, [])
    return ( 
        <div className="screen">
            <div className="center-hrz">
               <h1 className="screen__header u-margin-bottom white-text">My bugs</h1>
            </div>
            <BugsHeader/>
    {props.myBugs  ? props.myBugs[0].projectArr.map(bug=>{
        const id = nanoid(9)
        return <Bugs bugObj={bug} key={bug.id}/>}) : <p>Loading...</p>}
        </div>
     );
}

const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        myBugs: state.firestore.ordered.userProjects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {collection: "userProjects", doc: props.auth.uid},
        {collection: "comments"}
    ])
)(MyBugsDB);