import React from 'react';
import Bugs from "./bugs";
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";



const mapStateToProps = state=>({
    myBugs: state.myBugs
})

const MyBugsDB = (props) => {
    return ( 
        <div className="screen">
            <div className="center-hrz">
               <h1 className="screen__header u-margin-bottom white-text">My bugs</h1>
            </div>
            <BugsHeader/>
            {props.myBugs.map(bug=>(<Bugs bugObj={bug} index={bug.id}/>))}
        </div>
     );
}
 
export default connect(mapStateToProps)(MyBugsDB);