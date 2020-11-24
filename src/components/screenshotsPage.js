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
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.addScreenshot = this.addScreenshot.bind(this);
        this.progressRef = React.createRef();
    }

    state={
        file: "",
        notes: "",
    }


    handleChange(e){
        if(e.target.id === "file"){
            this.setState({
                file: e.target.files[0],
            })
        }else{
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        console.log(this.state)
    }

    addScreenshot(e){
        e.preventDefault();
        console.log("panda")
        this.props.addScreenshot(
            {  
                authorID: this.props.auth.uid,
                authorName: this.props.profile.name,
                notes: this.state.notes,
                timeStamp: new Date()
            }
        ,this.props.routeArgs.match.params.id,
        this.state.file
        )
    }

    componentDidMount(){
        mediumZoom('[data-zoomable]');
    }

    componentDidUpdate(){
        this.progressRef.current.value = this.props.uploadPercentage;
        console.log("i updated");
        if(this.progressRef.current.value === 100){
            setTimeout(()=>{
                this.progressRef.current.value = 0
            }, 2000)
        }
        this.props.scrollToBottom()
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
                   <div className="screenshot--upload-div">
                       <form action="" className="screenshot--upload-form" onSubmit={this.addScreenshot}>
                            <input type="file" onChange={this.handleChange} id="file" required/>
                            <input type="text"  placeholder="notes" onChange={this.handleChange} required id="notes"/>
                            <button type="submit">Submit</button>
                       </form>
                       <progress value="0" max="100" id="uploader" ref={this.progressRef}></progress>
                   </div>
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
        screenshots: state.firestore.ordered.screenshots,
        uploadPercentage:  state.uploadPercentage
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
