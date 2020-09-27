import React, {Component} from "react";
import {Link} from "react-router-dom";
import BugIcon from "../assets/bug.svg";
import Users from "../assets/users.svg";


export default class Menu extends Component{
    constructor(){
        super();
        this.linkClick = this.linkClick.bind(this);
    }

    linkClick(event){
        let currentLink = document.querySelector(".activeLink");
        if(currentLink){
            currentLink.classList.remove("activeLink")
        }
        event.currentTarget.classList.add("activeLink");
    }

    componentDidMount(){
        let links = document.querySelectorAll(".menu--link");
        links.forEach((link)=>{
            link.addEventListener("click", this.linkClick);
        })
    }


    render(){
        return (<div className="menu--container">
                   <label htmlFor="smenu-1" className="menu--sub"><img src={BugIcon} alt="bug icon"/>Bugs</label>
                   <input type="checkbox" id="smenu-1" className="checkBox"/>
                    <div className="menu--content menu--content__1">
                            <Link className="menu--link" to="/allBugs">All Bugs</Link>
                            <Link className="menu--link" to="/myBugs">My Bugs</Link>
                    </div>

                    <label htmlFor="smenu-2" className="menu--sub"><img src={Users} alt="users icon"/>Dev Team</label>
                   <input type="checkbox" id="smenu-2" className="checkBox"/>
                    <div className="menu--content menu--content__2">
                            <Link className="menu--link" to="/developers"><span>Developers</span></Link>

                    </div>

                </div>
            )
    }
}