import React, { useEffect, useRef} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
// import {Link} from "react-router-dom";
import MemberCard from "./memberCard";
import {firestoreConnect}  from "react-redux-firebase";
import JustAnimation from "./JustAnimation";

const AssignToDevs = props=>{
    const {routeArgs} = props,
           name = routeArgs.match.params.name,
           id = routeArgs.match.params.id,
           {profile} = props,
           errorRef = useRef();
           
           useEffect(()=>{
               if(props.bug && Array.from(document.querySelectorAll(".input-checkbox")).length > 0){
                console.log(Array.from(document.querySelectorAll(".input-checkbox")).length)
                    props.bug[0].devs.forEach(dev=>{
                        const id = dev.id;
                            document.getElementById(id).checked = "true"
                    })
               }
           })



        const setDevs = (e)=>{
            e.preventDefault();
            ///first check if at least one checkbox was selected
            const boxesArr = Array.from(document.querySelectorAll(".input-checkbox"));

            const filteredArr = boxesArr.filter(box=>{
                return box.checked;
            })

            const theRestArr = boxesArr.filter(box=>{
                return !box.checked;
            })
            if(filteredArr.length < 1){
                errorRef.current.style.display = "block";    
                setTimeout(()=>{
                    errorRef.current.style.display = "none";
                }, 3000)
            }else{
                 ///find the selected devIDs
                 const selectedIDs = filteredArr.map(box=>box.id);
                 //find the uselected devIDs
                 const unSelectedIDs = theRestArr.map(box=>box.id);
                 const unSelectedObjs = theRestArr.map(box=>JSON.parse(box.dataset.userobj));
                 const selectedObjs = filteredArr.map(box=>JSON.parse(box.dataset.userobj))
                 props.assignToDevs(selectedIDs, unSelectedIDs, id, unSelectedObjs, selectedObjs);
            }

            routeArgs.history.push(`/manageBug/${name}/${id}`);
        }   

    
        useEffect(()=>{
            if(profile.teamID && props.teamUsers.length === 0){
                props.getTeamUsers(profile.teamID)
            }

        },[profile])

        return (
            <div className="screen">
              <div className="screen">
                <div className="center-hrz--col">
                    <h1 className="screen__header u-margin-bottom white-text">Assign To Developers</h1>
                    <h3 className="white-text bigger-text u-margin-bottom-big">{name}: {id}</h3>
                </div>  
                <form onSubmit={setDevs}>
                    <div className="center-hrz--col u-margin-top-big u-margin-bottom">
                        {props.teamUsers.length > 0 ? props.teamUsers.map(dev=>(
                        <MemberCard checkbox="visible" key={dev.id} dev={dev}/>
                        )): <JustAnimation/>}
                    </div>

                    <div className="center-hrz--col">
                       <p className="red-text bigger-text u-margin-bottom" style={{display: "none"}} ref={errorRef}>Please select at least one developer</p>
                        <button type="submit" style={{ display: "block" }} className="button button__green">Assign to devs</button>
                    </div>
                </form>

            </div>
            </div>
        )
    
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch)
}

const mapStateToProps = state=>{
    return {
        profile: state.firebase.profile,
        teamUsers: state.teamUsers,
        bug: state.firestore.ordered.bugs
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {collection: "bugs", doc: props.routeArgs.match.params.id}
    ])
)(AssignToDevs);
