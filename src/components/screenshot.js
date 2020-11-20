import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import ScreenshotPic from "../assets/screenshot.png";
import moment from "moment";



export default class Screenshot extends Component{
    render(){
        return(
            <div className="screenshot--container">
            {/* <img src={this.props.authorPic} alt="user" className="screenshot--pic"/> */}
            <div className="screenshot--pic" style={{backgroundImage: `url(${this.props.screenshot})`}}></div>
            <p className="screenshot--title">{this.props.authorName} | <span>{moment(this.props.timeStamp.toDate()).calendar()}</span></p>
            <img src={this.props.screenshot} alt="" data-zoomable className="screenshot--screenshot u-margin-bottom img-zoomable"/>
            <p className="screenshot--note">Notes:<br></br>{this.props.notes}</p>
            </div>
        )
    }
}