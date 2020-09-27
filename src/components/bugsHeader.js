import React from "react";


export default function BugsHeader(props){
    return(
        <div className="bugs--header row">
            <p className="row-8--child black-text">bug id</p>
            <p className="row-8--child black-text">project</p>      
            <p className="row-8--child black-text">bug title</p>      
            <p className="row-8--child black-text">status</p>      
            <p className="row-8--child black-text">deadline</p>      
            <p className="row-8--child black-text" style={{textAlign: "center"}}>Dev(s)</p>      
            <p className="row-8--child black-text" style={{textAlign: "center"}}>comments</p>      
            <p className="row-9--child black-text" style={{textAlign: "center"}}>more</p>      
        </div>
    )
}