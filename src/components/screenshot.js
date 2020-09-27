import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import ScreenshotPic from "../assets/screenshot.png";



export default class Screenshot extends Component{
    render(){
        return(
            <div className="screenshot--container">
            <img src={Rando} alt="user" className="screenshot--pic"/>
            <p className="screenshot--title">Asiya Yang(admin)|<span>23 june 2020</span></p>
            <img src={ScreenshotPic} alt="" data-zoomable className="screenshot--screenshot u-margin-bottom img-zoomable"/>
            <p className="screenshot--note">Notes:<br></br>ipsum dolor sit amet consectetur adipisicing elit. Rerum ad adipisci eligendi maiores harum pariatur facilis illum dolorum, sequi odit doloribus iste eum repudiandae. In iusto et facere magni neque!</p>
            </div>
        )
    }
}