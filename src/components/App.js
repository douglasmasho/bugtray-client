import Main from "./main";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {bindActionCreators} from "redux";

const mapStatetoProps = function(state){
    return{
        testProp: state.test,
        // comments: state.comments,
        devs: state.devs,
        auth: state.firebase.auth
    }
}
function bindDispatchToProps(dispatch){
   return bindActionCreators(actions, dispatch)
}

const App = connect(mapStatetoProps, bindDispatchToProps)(Main);

export default App;