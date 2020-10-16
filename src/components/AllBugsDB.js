import React, { useEffect, useRef, useState } from 'react';
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import Bugs from "./bugs";
import {Link} from "react-router-dom"
import Button from "./button";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";



const AllBugsDB = (props) => {
    const teamBugsRef = useRef(null);
    const bugsIDsRef = useRef([]);
    const bugsArrRef = useRef([]);
    const [bugsState, setBugsState] = useState([]);
    useEffect(()=>{
        console.log(props.teamBugs, props.profile.teamID)
        if(props.bugs && props.teamBugs && props.profile.teamID && props.teamBugs[props.profile.teamID]){
            const bugIDs = props.teamBugs[props.profile.teamID].bugs;
            console.log(bugIDs)
            if(bugIDs){
                setBugsState(bugIDs.map(id=>{
                    return {
                        ...props.bugs[id],
                        id
                    }
                }))
            }
        }
    }, [props.bugs,props.teamBugs,props.profile.teamID])

    useEffect(()=>{
        console.log("i rendered")
    })

    if(!props.auth.uid){
        return <Redirect to="/"/>
    }
    return ( 
        <div className="screen">
        <div className="center-hrz">
        <h1 className="screen__header u-margin-bottom white-text">All bugs</h1>
        </div>
            <BugsHeader/>
        {/* the components(array) that represent individual bugs will come here. */}
        <div>
            {/* <Bugs bugObj={{deadLine: new Date("2020-05-10"),name: "DripFootwear", id:0}} />
            <Bugs bugObj={{deadLine: new Date("2020-09-30"),name: "Kronos", id:1}}/>
            <Bugs bugObj={{deadLine: new Date(),name: "Athena", id:2}}/> */}
            {bugsState.map((bug, index)=>(
                <Bugs bugObj={bug} key={bug.id}/>
            // <p key={bug.id}>{bug.id}</p>
            ))}
        </div>
        <div className="center-hrz">
        <Link to="/addBug"> <Button name="Add Bug (admins only)" specClasses="u-margin-top-big button__green"/> </Link> 
        </div>  
    </div>
     );
}

const mapStateToProps = state=>{
    return {
        bugs: state.firestore.data.bugs,
        // bugs1: state.firestore.ordered.bugs,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        teamBugs: state.firestore.data.teamBugs
    }
}

export default React.memo(compose(
    connect(mapStateToProps),
    firestoreConnect(()=>["teamBugs", "bugs"])
)(AllBugsDB),()=>(false) );
//true means that it will not re-render