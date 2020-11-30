import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import MemberCard from "./memberCard";
import {Link} from "react-router-dom";
import Button from "./button";


const AssignedDevs = (props) => {
    const {routeArgs} = props,
    name = routeArgs.match.params.name,
    id = routeArgs.match.params.id;
    useEffect(()=>{
        ///run the action to get the assigned devs
        props.getBugDevs(props.routeArgs.match.params.id);

    },[])
    useEffect(()=>{
        console.log(props.bugDevs);
    })

    return ( 
        <div className="screen">
                <div className="center-hrz--col">
                    <h1 className="screen__header u-margin-bottom white-text">Developers</h1>
                    <h3 className="white-text bigger-text u-margin-bottom">Bug ID: {props.routeArgs.match.params.id}</h3>
                </div>  

            <div className="center-hrz--col u-margin-top-big">
                {typeof(props.bugDevs) === "object" ? props.bugDevs.length > 0 ? props.bugDevs.map((dev)=>(<MemberCard checkbox="none" key={dev.id} dev={dev}/>)) : <Link to={`/assignToDevs/${name}/${id}`}><Button name="Assign to Developers" specClasses="button__yellow u-margin-bottom"></Button></Link>
                : <p className="white-text bigger-text">Loading...</p>}
            </div>    
        </div>

     );
}


const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch)
}


const mapStateToProps = state=>{
    return {
        // auth: state.firebase.auth,
        // profile: state.firebase.profile,
        bugDevs: state.bugDevs,
    }
}




 
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // firestoreConnect(()=>["bugs"])
)(AssignedDevs);