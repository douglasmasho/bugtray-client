import React, {Component} from "react";
import btIcon from "../assets/bticon.svg";
import Button from "./button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../redux/actions";


class HomePage extends Component{
    overlayRef = React.createRef(null);
    logInMRef = React.createRef();
    signUpMRef = React.createRef();
    constructor(){
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.askId = this.askId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);

    }
    state = {
        email: "",
        password: "",
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
        // const modal = document.getElementById(`modal-${type}`);
        let modal;
        switch(type){
            case "login": modal = this.logInMRef.current;
            break;
            case "signup": modal = this.signUpMRef.current
        }
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
    
    logout(){
        this.props.signOut();
    }

    handleChange(e){
        // console.log(e.target.name);
        console.log(this.props.authError)
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    signIn(e){
        e.preventDefault();
        // console.log(this.state)
        this.props.signIn(this.state);
    }



    componentDidUpdate(prevState, prevProps){
        
        if(prevState !== this.state){
        console.log(this.props.loginSuccess)
            if(this.props.loginSuccess){
                     this.closeModal("login");
             }
        }
    }
    render(){
        const {auth} = this.props;
        console.log(this.props.loginSuccess)
        let buttons;
        if(auth.uid){
          buttons =   <Button name="Log Out" specClasses="button__red u-margin-right" callBack={e=>{ this.logout(); }}/>
        }else{
            buttons = <>
                                            <Button name="Log In"  specClasses="button__yellow u-margin-right" callBack={(event)=>{
                                    this.openModal("login")
                                }}/>
                                <Button name="Sign Up" specClasses="button__green u-margin-right"callBack={(event)=>{
                                    this.openModal("signup")
                                }}/>
            </>
        }
        console.log(auth)
        return(
            <div className="homePage">
                 <div className="center-hrz-col homePage--div" style={{width: "100%"}}>
                        <img className="homePage--logo u-margin-bottom-big" src={btIcon} alt="logo"/>
                            <div className="row homePage--row">
                                {/* <Button name="Log In"  specClasses="button__yellow u-margin-right" callBack={(event)=>{
                                    this.openModal("login")
                                }}/>
                                <Button name="Sign Up" specClasses="button__green u-margin-right"callBack={(event)=>{
                                    this.openModal("signup")
                                }}/>
                                <Button name="Log Out" specClasses="button__red u-margin-right" callBack={e=>{
                                    this.logout();
                                }}/> */}
                                {buttons}
                            </div>
                 </div>

                <div className="modal " id="modal-login" ref={this.logInMRef}>
                     <button data-close-button className="close-button">&times;</button>
                     <div className="modal-header">
                            <h2 className="modal-title blue-text normal-text">Log in</h2>
                     </div>
                     <div className="modal-body u-margin-bottom center-hrz--col u-margin-top">
                         <form className="center-hrz--col" onSubmit={this.signIn} style={{width: "80%"}}>
                            <div className="input-group">
                                <input type="text" className="input-text" id="login-email" name="email" placeholder="Email*"  onChange={this.handleChange} required/>
                                <label htmlFor="login-email" className="input-label">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" className="input-text" id="login-password" name="password" placeholder="Passsword*" onChange={this.handleChange}  required/>
                                <label htmlFor="login-password" className="input-label">Password</label>
                            </div>
                              {this.props.authError ? <p className="red-text bigger-text">Username or password is wrong</p>: null}
                            <input type="submit"   value="log in" className="button button__green"/>
                         </form>
                     </div>
                </div>


                <div className="modal" id="modal-signup" ref={this.signUpMRef}>
                    
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

const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionCreators, dispatch);
}
const mapStateToProps = state=>{
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        loginSuccess: state.auth.loginSuccess
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);