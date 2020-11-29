import React from 'react';
import { useEffect } from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";

///read the current status, and check the right button


const ChangeStatus = (props) => {
    const {routeArgs} = props;
    const name = routeArgs.match.params.name;
    const id = routeArgs.match.params.id;


    useEffect(()=>{
        
    }, [])
    const changeStatus = (e)=>{
        e.preventDefault();
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
                    <input type="radio" name="status" id="new" className="radio" required/>
                     <label htmlFor="new" className="radio-label" tabIndex="2" >New</label>
                     <input type="radio" name="status" id="under-review" className="radio"/>
                     <label htmlFor="under-review" className="radio-label" tabIndex="2" >Under review</label>
                     <input type="radio" name="status" id="fixed" className="radio"/>
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

// const mapStateToProps = state=>{
//     return {
//         auth: state.firebase.auth,
//         profile: state.firebase.profile,
//         screenshots: state.firestore.ordered.screenshots,
//         uploadPercentage:  state.uploadPercentage
//     }
// }



 
export default connect(null, mapDispatchToProps)(ChangeStatus);