import React, {Component} from "react";
import Rando from "../assets/rando.jpg"

 class MemberCard extends Component{

    render(){
        return(
            <div className="memberCard u-margin-bottom-big" data-userobj={this.props.dev}>
                <img src={Rando} alt="randomUser" className="memberCard--pic"/>
                 <p className="memberCard--name white-text">{this.props.dev.name}</p>
                <div className="input-checkbox-group" style={{display: `${this.props.checkbox}`}}>
                 <input type="checkbox" name={this.props.checkboxName} id={this.props.dev.userID} className="input-checkbox"/>
                            <label htmlFor={this.props.dev.userID}  className="input-checkbox-label">
                              <span className="input-checkbox-button"></span>
                            </label>
                </div>  
            </div>
        )
    }
}

export default MemberCard;