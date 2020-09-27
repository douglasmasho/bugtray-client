import React, {Component} from "react";
import {Link} from "react-router-dom";
import Bell from "../assets/bellicon.svg";

export default class BottomDiv extends Component{
    render(){
        return <div className="row bottomDiv">
                        <div className="bottomDiv__1">
                           <img src={Bell} alt="bellIcon" className="bottomDiv--icon"/> <p className="normal-text bold-text white-text bottomDiv--num">100</p>
                        </div>
                        <div className="bottomDiv__2">
                        <p className="bigger-text bold-text bottomDiv--text">Invite</p>
                        </div>
               </div>
    }
}