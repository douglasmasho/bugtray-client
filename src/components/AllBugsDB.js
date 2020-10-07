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
        console.log("i rendered");

        if(props.teamBugs && props.bugs){
            teamBugsRef.current = props.teamBugs[props.profile.teamID]
            console.log(teamBugsRef.current);
            if(teamBugsRef.current){
                bugsIDsRef.current = teamBugsRef.current.bugs;
                // console.log(props.bugs1);

            }
        }
    })

    useEffect(()=>{
        setBugsState(bugsIDsRef.current.map(id=>{
            return {
                ...props.bugs[id],
                id
            }
        }))
        console.log(bugsState, "bugsstate")
    }, [teamBugsRef.current])
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
    console.log(state.firebase)
    return {
        bugs: state.firestore.data.bugs,
        // bugs1: state.firestore.ordered.bugs,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        teamBugs: state.firestore.data.teamBugs
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(()=>["teamBugs", "bugs"])
    )(AllBugsDB);