import React from 'react';
import {connect} from "react-redux";
import BugsHeader from "./bugsHeader";
import Bugs from "./bugs";
import {Link} from "react-router-dom"
import Button from "./button";


const mapStateToProps = state=>({
    bugs: state.bugs
})
const AllBugsDB = (props) => {
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
            {props.bugs.map((bug, index)=>(
                <Bugs bugObj={bug} key={index}/>
            ))}
        </div>
        <div className="center-hrz">
        <Link to="/addBug"> <Button name="Add Bug (admins only)" specClasses="u-margin-top-big button__green"/> </Link> 
        </div>  
    </div>
     );
}
 
export default connect(mapStateToProps)(AllBugsDB);