import React, {PureComponent} from "react";

 class MemberCard extends PureComponent{

    render(){
        return(
            <div className="memberCard u-margin-bottom-big" data-userobj={this.props.dev}>
                
                <div alt="randomUser" className="memberCard--pic" style={{backgroundImage: `url(${this.props.dev.imgSrc})`}}></div>
                 <p className="memberCard--name white-text">{this.props.dev.name}</p>
                <div className="input-checkbox-group" style={{display: `${this.props.checkbox}`}}>
                 <input type="checkbox" name={this.props.checkboxName} id={this.props.dev.id} className="input-checkbox" data-userobj={JSON.stringify(this.props.dev)}/>
                            <label htmlFor={this.props.dev.id}  className="input-checkbox-label">
                              <span className="input-checkbox-button"></span>
                            </label>
                </div>  
            </div>
        )
    }
}

export default MemberCard;