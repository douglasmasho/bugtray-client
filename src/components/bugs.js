import React, {Component} from "react";
import Dots from "../assets/dots.svg";
import {Link} from "react-router-dom";
import Eye from "../assets/eye.svg";
// import {Link} from "react-router-dom";


export default class Bugs extends Component{

    render(){
    let {name, id, deadLine, title, status} = this.props.bugObj;
    let formattedDate = deadLine;
    console.log(formattedDate);
        return (
        <div className="bugs--data row">
        <li className="white-text bugs--row row-8--child">
            <p className="bugs--row--title black-text">Bug id</p>
    <p className="bugs--row--value">{id}</p>
        </li>  
        <li className="white-text bugs--row row-8--child">
            <p className="bugs--row--title black-text ">Project</p>
    <p className="bugs--row--value">{name}</p>
        </li>   
        <li className="white-text bugs--row row-8--child">
            <p className="bugs--row--title black-text">Bug title</p>
        <p className="bugs--row--value">{title}</p>
        </li>   
        <li className="white-text bugs--row row-8--child">
            <p className="bugs--row--title black-text">status</p>
        <p className="bugs--row--value">{status}</p>
        </li>   
        <li className="white-text bugs--row row-8--child">
            <p className="bugs--row--title black-text">deadline</p>
            <p className="bugs--row--value">{formattedDate}</p>
        </li>  
        <li className="white-text bugs--row row-8--child" style={{justifyContent: "center"}}>
            <p className="bugs--row--title black-text">Dev(s)</p>
            <Link to={`/assignedDevs/${name}/${id}`}><p className="bugs--row--value"><img src={Eye} className="bugs--icon" alt="eye"/></p></Link>
        </li>    
        <li className="white-text bugs--row row-8--child" style={{justifyContent: "center"}}>
            <p className="bugs--row--title black-text">comments</p>
            <Link to={`/comments/${name}/${id}`}><p className="bugs--row--value"><img src={Eye} className="bugs--icon" alt="eye"/></p></Link>
        </li>    

        <li className="white-text bugs--row row-9--child" style={{justifyContent: "center"}}>
            <p className="bugs--row--title black-text">more</p>
            <Link to={`/manageBug/${name}/${id}`}><img src={Dots} alt="dots" className="bugs--more"/></Link>
        </li>       
    </div>)
    }
}
