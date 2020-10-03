import React, {Component} from "react";
// import {Link} from "react-router-dom";
import MemberCard from "./memberCard";

export default class AssignedDevs extends Component{
    render(){
        const {routeArgs} = this.props;
        // const name = routeArgs.match.params.name;
        const id = routeArgs.match.params.id



        

        //use the id to fid the rght bug, and in that bug, fin the devs array, and the map thru that array to render a list of member cards.
        return (
            <div className="screen">
                {/* <div className="center-hrz--col u-margin-bottom-big">
                    <h1 className="screen__header white-text">Assigned developers </h1>
                    <h3 className="white-text normal-text">{name}-{id}</h3>
                 </div>
                 <div className="center-hrz--col">
                    <MemberCard checkbox="none"/>
                    <MemberCard checkbox="none"/>
                    <MemberCard checkbox="none"/>
                    <MemberCard checkbox="none"/>
                    <MemberCard checkbox="none"/>
                 </div> */}
            </div>
        )
    }
}