import React, {Component} from "react";
import {Link} from "react-router-dom";
import Screenshot from "./screenshot";
import mediumZoom from 'medium-zoom';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";



class ScreenshotsPage extends Component{
    componentDidMount(){
        mediumZoom('[data-zoomable]');
    }

    componentDidUpdate(){
        console.log(this.props.screenshots)
    }

    render(){
        const {routeArgs} = this.props;
        const id = routeArgs.match.params.id;
        const name = routeArgs.match.params.name;
        let screenshotsArr;
        this.props.screenshots && this.props.screenshots.length > 0 ? screenshotsArr = this.props.screenshots[0].screenshots : screenshotsArr = [];
        return(<div className="screen center-hrz--col">
                  <h1 className="screen__header u-margin-bottom-big white-text">Screenshots</h1>
                   <h3 className="white-text normal-text u-margin-bottom-big">{name}-{id}</h3>
                   {
                      screenshotsArr.map(screenshot=> (<Screenshot key={screenshot.screenshotID} authorName={screenshot.authorName} timeStamp={screenshot.timeStamp} notes={screenshot.notes} screenshot={screenshot.screenshotSrc} authorPic={screenshot.authorPic}/>))
                   }
               </div>)
    }
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = state=>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        screenshots: state.firestore.ordered.screenshots
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>[
        {
        collection: "screenshots",
        doc: props.routeArgs.match.params.id
        }
    ])
)(ScreenshotsPage)
