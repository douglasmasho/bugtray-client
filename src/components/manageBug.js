import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "./button"


export default class ManageBug extends Component{
    constructor(){
        super();
        this.deleteBug = this.deleteBug.bind(this);  
    }
    deleteBug(){
        //this is the function where you delete the bug from firestore before you go back tpo the last page
        const {routeArgs} = this.props;
        const {history} = routeArgs;
        history.push("/allBugs");
    }

    render(){
        const {routeArgs} = this.props;
        const name = routeArgs.match.params.name;
        const id = routeArgs.match.params.id;


        return(
                        <div className="screen">
                            <div className="center-hrz u-margin-bottom-big">
        <h1 className="screen__header u-margin-bottom white-text">Manage Bug: {name}({id})</h1> 
                            </div>

                            <div className="center-hrz--col">
                               <Link to={`/assignToDevs/${name}`}><Button name="Assign to Developers(admins only)" specClasses="button__yellow u-margin-bottom"></Button></Link>
                               <Link to={`/changeStatus/${name}`}><Button name="Change status" specClasses="button__yellow u-margin-bottom"></Button></Link>
                               <Link to={`/comments/${name}`}><Button name="Comments" specClasses="button__yellow u-margin-bottom"></Button></Link>
                               <Link to={`/screenshots/${name}`}><Button name="Screenshots" specClasses="button__yellow u-margin-bottom"></Button></Link>
                               <Button name="Delete Bug(admins only)" specClasses="button__red u-margin-bottom" callBack={this.deleteBug}></Button>
                            </div>
                        </div>
        )
    }
}
