import React, { useEffect } from 'react';
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
import JustAnimation from './JustAnimation';


const AllBugsDB = (props) => {
    const {profile} = props;


    useEffect(()=>{
        // if(profile.teamID ){
        //     props.getTeamBugs(profile.teamID);
        // }
    }, [profile])


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
        <div>
            {props.bugs ? props.bugs.length >= 1 ? props.bugs.map(obj=>obj).sort((a,b)=>b.createdAt.valueOf() - a.createdAt.valueOf()).map((bug, index)=>(
                <Bugs bugObj={bug} key={bug.id}/>
            )) : <p className="normal-text white-text">No data</p> : <JustAnimation/>}
        </div>
        <div className="center-hrz">
        </div>  
    </div>
     );
}

const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        bugs: state.firestore.ordered.bugs,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        teamBugs: state.teamBugs
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(({profile})=>{
        if(profile.teamID){
            return [
            {collection: "bugs", where: [["teamID", "==", profile.teamID]]}
            ]
        }else{
            return [{collection: "empty"}]
        }

    })
)(AllBugsDB);