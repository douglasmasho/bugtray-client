import React, {Component} from "react";
import moment from "moment";

import {Magnifier} from "react-image-magnifiers";



export default class Screenshot extends Component{
    render(){
        return(
            <div className="screenshot--container">
            {/* <img src={this.props.authorPic} alt="user" className="screenshot--pic"/> */}
            <div className="screenshot--pic" style={{backgroundImage: `url(${this.props.authorPic})`}}></div>
            <p className="screenshot--title">{this.props.authorName} | <span>{moment(this.props.timeStamp.toDate()).calendar()}</span></p>
             <div className="center-hrz">
              <Magnifier imageSrc={this.props.screenshot} imageAlt="" style={{width: "80%"}} dragToMove={false}/>
             </div>
            {/* <img src={this.props.screenshot} alt="" data-zoomable className="screenshot--screenshot u-margin-bottom img-zoomable"/> */}
            <p className="screenshot--note">Notes:<br></br>{this.props.notes}</p>

            </div>
        )
    }
}