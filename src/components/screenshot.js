import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import ScreenshotPic from "../assets/screenshot.png";
import moment from "moment";

import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";



export default class Screenshot extends Component{
    componentDidMount(){
        // console.log(this.props.screenshot)
    }
    render(){
        // console.log(this.props.screenshotSrc, this.props.userPic)
        return(
            <div className="screenshot--container">
            {/* <img src={this.props.authorPic} alt="user" className="screenshot--pic"/> */}
            <div className="screenshot--pic" style={{backgroundImage: `url(${this.props.authorPic})`}}></div>
            <p className="screenshot--title">{this.props.authorName} | <span>{moment(this.props.timeStamp.toDate()).calendar()}</span></p>
             <div class="center-hrz">
              <Magnifier imageSrc={this.props.screenshot} imageAlt="" style={{width: "80%"}} dragToMove={false}/>
             </div>
            {/* <img src={this.props.screenshot} alt="" data-zoomable className="screenshot--screenshot u-margin-bottom img-zoomable"/> */}
            <p className="screenshot--note">Notes:<br></br>{this.props.notes}</p>

            </div>
        )
    }
}