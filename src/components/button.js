import React, {Component} from "react";




export default class Button extends Component{

    render(){
                return (<button onClick={this.props.callBack} className={`button ${this.props.specClasses}`}> 
                   <p>{this.props.name}</p>
                 </button>)    
    }
}