import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg";
import moment from "moment";

export default class Comments extends Component{
    render(){
        return (
            <div className="comment--container">
                {/* <img src={Rando} /> */}
                <div className="comment--pic" style={{backgroundImage: `url(${this.props.imgSrc})`}}></div>
                <p className="comment--title">{this.props.name} | <span> {moment(this.props.timeStamp.toDate()).calendar()}</span></p>
                <div className="comment--text">
                  <p >{this.props.text}</p>
                </div>
            </div>
        )
    }
}

