import React, {Component} from "react";
import Screenshot from "./screenshot";
import mediumZoom from 'medium-zoom';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import Down from "../assets/arrow-down.svg";



class ScreenshotsPage extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.addScreenshot = this.addScreenshot.bind(this);
        this.progressRef = React.createRef();

        this.downRef = React.createRef();
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
        
    }

    addScreenshot(e){
        e.preventDefault();
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

        
     const element = document.querySelector("#dashboard");
     this.downRef.current.style.opacity = "1"
     element.addEventListener("scroll", this.scrollListener)
    }

    componentWillUnmount(){
     const element = document.querySelector("#dashboard");
        console.log("removed")
        element.removeEventListener("scroll", this.scrollListener)
    }

    scrollListener = ()=>{
        const element = document.querySelector("#dashboard");
   
           if(this.downRef.current){           
                if(element.clientHeight + element.scrollTop === element.scrollHeight){
                   this.downRef.current.style.opacity = "0";
               }else{
                   this.downRef.current.style.opacity = "1";
               }
           }
       }

    componentDidUpdate(){
        this.progressRef.current.value = this.props.uploadPercentage;
        if(this.progressRef.current.value === 100){
            setTimeout(()=>{
                this.progressRef.current.value = 0
            }, 2000)
        }
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
                      screenshotsArr.map(screenshot=> (<Screenshot key={screenshot.screenshotID} authorName={screenshot.authorName} timeStamp={screenshot.timeStamp} notes={screenshot.notes} screenshot={screenshot.screenshotSrc} authorPic={screenshot.authorPic} authorID={screenshot.authorID} uid={this.props.auth.uid} bugID={id} screenshotID={screenshot.screenshotID}/>))
                   }

                   <div className="screenshot--upload">
                       <form onSubmit={this.addScreenshot}>
                            <input type="file" onChange={this.handleChange} id="file" required className="screenshot--file u-margin-bottom"/>
                            <textarea type="text"  placeholder="notes" onChange={this.handleChange} required id="notes" className="screenshot--notes"></textarea>
                            <div className="row">
                                <button type="submit" className="button button__green">Submit</button>
                                <progress value="0" max="100" id="uploader" ref={this.progressRef} className="screenshot--progress"></progress>
                            </div>
                       </form>
                       <button className="comment--down" onClick={this.props.scrollToBottom} ref={this.downRef}><img src={Down} alt=""/></button>
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
