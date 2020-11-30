import React from "react";
import { withRouter } from "react-router-dom"

const Test = (props)=>{
    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}

/*
import {bindActionCreators} from "redux";
import {xAction} from "../redux/actions";

function bindActionsToDispatch(dispatch){
    return bindActionCreators({xAction}, dispatch);
}

const App = connect(mapingFunc, bindActionsToDispatch)(Main)



*/

///////

export default  withRouter(Test);
