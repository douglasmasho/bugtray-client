import React, {Component} from "react";
import {Link} from "react-router-dom";
import Screenshot from "./screenshot";
import mediumZoom from 'medium-zoom';



export default class ScreenshotsPage extends Component{
    componentDidMount(){
        mediumZoom('[data-zoomable]');
    }
    render(){
        const {routeArgs} = this.props;
        const name = routeArgs.match.params.name;
         return(<div className="screen center-hrz--col">
                  <h1 className="screen__header u-margin-bottom-big white-text">Screenshots - {name}</h1>
                  <Screenshot/>
                  <Screenshot/>
                  <Screenshot/>            
               </div>)
    }
}