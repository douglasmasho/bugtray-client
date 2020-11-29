import React, { useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

///read the current status, and check the right button


const ChangeStatus = (props) => {
    const {routeArgs} = props,
            name = routeArgs.match.params.name,
            id = routeArgs.match.params.id,
            [status, setStatus] = useState("");
   

    useEffect(()=>{
        if(props.bugs){
            document.getElementById(props.bugs[0].status).checked = "true";
        }
    },[])        

    const setStatusFunc = (e)=>{
        setStatus(e.target.id);
    }
    
            
    const changeStatus = (e)=>{
        e.preventDefault();
        console.log(status)
           
        props.changeStatus(id, status);
        routeArgs.history.push(`/manageBug/${name}/${id}`);
    }


    return ( 
        <div className="screen center-hrz--col">
            <div className="center-hrz-col">
               <h1 className="screen__header u-margin-bottom white-text">Change Status</h1>
            </div>
            <h3 className="white-text bigger-text u-margin-bottom-big">{name}: {id}</h3>
            <div className="radio-field u-margin-bottom">
                <form onSubmit={changeStatus}>
                    <div className="u-margin-bottom-big">
                    <input type="radio" name="status" id="new" className="radio" required onChange={setStatusFunc}/>
                     <label htmlFor="new" className="radio-label" tabIndex="2" >New</label>
                     <input type="radio" name="status" id="under-review" className="radio" onChange={setStatusFunc}/>
                     <label htmlFor="under-review" className="radio-label" tabIndex="2" >Under review</label>
                     <input type="radio" name="status" id="fixed" className="radio" onChange={setStatusFunc}/>
                     <label htmlFor="fixed" className="radio-label" tabIndex="2" >Fixed</label>

                    </div>

                     <div className="center-hrz">
                        <button type="submit" style={{display: "block"}} className="button button__green">Change Status</button>
                     </div>

                </form>

            </div>
        </div>
     );
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        bugs: state.firestore.ordered.bugs,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {
        collection: "bugs",
        doc: props.routeArgs.match.params.id
        }
    ])
    
)(ChangeStatus);