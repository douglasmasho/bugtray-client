import React, {component, Component} from "react";
import btIcon from "../assets/bticon.svg";
import Button from "./button";



export default class HomePage extends Component{
    overlayRef = React.createRef(null);
    constructor(){
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.askId = this.askId.bind(this);
    }

    askId(type){
        const idDiv = document.getElementById("id-div");
        const idInp = document.getElementById("team-id");
        // console.log(idDiv);
        if(type === "new"){
            idDiv.style.display = "none"
            //assign id to the new team using uuid
        }else if(type === "existing"){
            idDiv.style.display = "block";
            idInp.required = true
        }

    }


    closeModal(type){
        const modal = document.getElementById(`modal-${type}`);
        const overlay = this.overlayRef.current;
        modal.classList.remove("active");
        overlay.classList.remove("active");   
    }

    openModal(type){ 
        const modal = document.getElementById(`modal-${type}`);
        const overlay = this.overlayRef.current;
        modal.classList.add("active");
        overlay.classList.add("active");   
        const closeModalButtons = document.querySelectorAll("[data-close-button]");
        closeModalButtons.forEach(button=>{
            button.addEventListener("click", ()=>{
                this.closeModal(type);
            })
        })
    }
    render(){
        return(
            <div className="homePage">
                 <div className="center-hrz-col homePage--div" style={{width: "100%"}}>
                        <img className="homePage--logo u-margin-bottom-big" src={btIcon} alt="logo"/>
                            <div className="row homePage--row">
                                <Button name="Log In"  specClasses="button__yellow u-margin-right" callBack={(event)=>{
                                    this.openModal("login")
                                }}/>
                                <Button name="Sign Up" specClasses="button__green"callBack={(event)=>{
                                    this.openModal("signup")
                                }}/>
                            </div>
                 </div>

                <div className="modal " id="modal-login">
                     <button data-close-button className="close-button">&times;</button>
                     <div className="modal-header">
                            <h2 className="modal-title blue-text normal-text">Log in</h2>
                     </div>
                     <div className="modal-body u-margin-bottom center-hrz--col u-margin-top">
                         <form className="center-hrz--col" style={{width: "80%"}}>
                            <div className="input-group">
                                <input type="text" className="input-text" id="login-email" placeholder="Email*" required/>
                                <label htmlFor="login-email" className="input-label">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="text" className="input-text" id="login-password" placeholder="Passsword*" required/>
                                <label htmlFor="login-password" className="input-label">Password</label>
                            </div>
                            <input type="submit"  value="log in" className="button button__green"/>
                         </form>
                     </div>
                </div>


                <div className="modal" id="modal-signup">
                    <button data-close-button className="close-button">&times;</button>
                    <div className="modal-header">
                        <h2 className="modal-title blue-text normal-text">Sign up</h2>
                    </div>
                    <div className="modal-body center-hrz--col u-margin-bottom">
                         <form className="center-hrz--col" style={{width: "80%"}}>
                         <div className="input-group">
                                <input type="text" className="input-text" id="signup-name" placeholder="Name*" required/>
                                <label htmlFor="signup-name" className="input-label">Name</label>
                            </div>
                            <div className="input-group">
                                <input type="text" className="input-text" id="signup-email" placeholder="Email*" required/>
                                <label htmlFor="signup-email" className="input-label">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="text" className="input-text" id="signup-passowrd" placeholder="Password*" required/>
                                <label htmlFor="signup-passowrd" className="input-label">Password</label>
                            </div>
                            
                            <div className="radio-field u-margin-bottom">
                                <input type="radio" name="user-team" id="new team" className="radio"/>
                                <label htmlFor="new team" className="radio-label" tabIndex="2" onClick={()=>{this.askId("new")}}>New Team</label>
                                <input type="radio" name="user-team" id="exisiting-team" className="radio"/>
                                <label htmlFor="exisiting-team" className="radio-label" tabIndex="2" onClick={()=>{this.askId("existing")}}>existing team</label>
                            </div>
                            <div id="id-div" style={{display: "none"}}>
                              <input type="text" className="input-text" id="team-id" placeholder="ID*"/>
                              <label htmlFor="team-id" className="input-label">ID</label>
                            </div>
                            <input type="submit" value="log in" className="button button__green"/>
                            
                         </form>
                    </div>
                </div>
                <div className="overlay" ref={this.overlayRef}></div>


            </div>
        )
    }
}