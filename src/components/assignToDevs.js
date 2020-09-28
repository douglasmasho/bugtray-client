import React, {Component} from "react";
import {Link} from "react-router-dom";
import MemberCard from "./memberCard";

export default class AssignToDevs extends Component{
    render(){
        const {routeArgs} = this.props;
        const name = routeArgs.match.params.name;
        return (
            <div className="screen">
                 {/* <div className="center-hrz">
                     <h1 className="screen__header u-margin-bottom white-text">{`Assign to developers - ${name}`}</h1>
                 </div>
                 <div className="center-hrz--col">
                    <MemberCard checkbox="visible" checkboxName="assignedDevs"/>
                    <MemberCard checkbox="visible" checkboxName="assignedDevs"/>
                    <MemberCard checkbox="visible" checkboxName="assignedDevs"/>
                    <MemberCard checkbox="visible" checkboxName="assignedDevs"/>
                    <MemberCard checkbox="visible" checkboxName="assignedDevs"/>
                 </div> */}
            </div>
        )
    }
}