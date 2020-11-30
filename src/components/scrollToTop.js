import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component{
    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){
            this.props.scrollToTop();
        }
    }

    render(){
        return null;
    }
}


export default withRouter(ScrollToTop);