import React, {Component} from "react";
import {Link} from "react-router-dom";
import Rando from "../assets/rando.jpg"


export default class Comments extends Component{
    render(){
        return (
            <div className="comment--container">
                <img src={Rando} alt="user" className="comment--pic"/>
                <p className="comment--title">Asiya Yang|<span>23 june 2020</span></p>
                <div className="comment--text">
                  <p >{this.props.text}</p>
                </div>
            </div>
        )
    }
}