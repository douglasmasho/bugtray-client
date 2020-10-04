import React from 'react';
import Bugs from "./bugs";
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import {Redirect} from "react-router-dom";





const MyBugsDB = (props) => {
    console.log(props.myBugs)
    if(!props.auth.uid){
        return <Redirect to="/"/>
    }
    return ( 
        <div className="screen">
            <div className="center-hrz">
               <h1 className="screen__header u-margin-bottom white-text">My bugs</h1>
            </div>
            <BugsHeader/>
            {props.myBugs.map(bug=>(<Bugs bugObj={bug} key={bug.id}/>))}
        </div>
     );
}

const mapStateToProps = state=>({
    myBugs: state.myBugs,
    auth: state.firebase.auth
})
 
export default connect(mapStateToProps)(MyBugsDB);