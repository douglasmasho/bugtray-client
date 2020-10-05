import React, { useEffect } from 'react';
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import Bugs from "./bugs";
import {Link} from "react-router-dom"
import Button from "./button";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";



const AllBugsDB = (props) => {
    useEffect(()=>{
        console.log(props.firestore1)
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
            {props.bugs1 ? props.bugs1.map((bug, index)=>(
                <Bugs bugObj={bug} key={bug.id}/>
            )): <p>No data</p>}
        </div>
        <div className="center-hrz">
        <Link to="/addBug"> <Button name="Add Bug (admins only)" specClasses="u-margin-top-big button__green"/> </Link> 
        </div>  
    </div>
     );
}

const mapStateToProps = state=>{
    console.log(state.firestore)
    return {
        bugs: state.bugs,
        bugs1: state.firestore.ordered.bugs,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(()=>["bugs"])
    )(AllBugsDB);