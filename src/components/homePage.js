import React, {Component} from "react";
import btIcon from "../assets/bticon.svg";
import Button from "./button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../redux/actions";
import { nanoid } from 'nanoid';
import Pencil from "../assets/pencil.svg";

class HomePage extends Component{


    constructor(){
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.askId = this.askId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSU = this.handleChangeSU.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.uploadDecoy = this.uploadDecoy.bind(this);


        this.overlayRef = React.createRef(null);
        this.logInMRef = React.createRef();
        this.signUpMRef = React.createRef();
        this.signUpErrorRef = React.createRef();
        this.imgRef = React.createRef();
        this.idDivRef = React.createRef();
        this.teamIDRef = React.createRef();
        this.uploadPicRef = React.createRef();

    }
    state = {
        email: "",
        password: "",
        nameSU: "",
        emailSU: "",
        passwordSU: "",
        teamIDSU: "",
        type: ""
    }

    askId(type){
        const idDiv = this.idDivRef.current
        const idInp = this.teamIDRef.current;
       
        if(type === "new"){
            idDiv.style.display = "none"
            //assign id to the new team using uuid
            const id = nanoid(9);
            this.setState({
                teamIDSU: id,
                type: "new"
            })
        }else if(type === "existing"){
            idDiv.style.display = "block";
            idInp.required = true;
            this.setState({
                type: "existing"
            })
        }

    }


    closeModal(type){
        let modal;
        switch(type){
            case "login": modal = this.logInMRef.current;
               break;
            case "signup": modal = this.signUpMRef.current;
               break;
            default: //

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
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSU(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    signIn(e){
        e.preventDefault();
        this.props.signIn(this.state);
    }

    signUp(e){
        e.preventDefault();
        const radios = Array.from(document.querySelectorAll(".radioSU"));
        const checked = radios.filter(radio=> radio.checked === true);
        if(checked.length !== 1){
            this.signUpErrorRef.current.style.display = "block";
            setTimeout(()=>{
                this.signUpErrorRef.current.style.display = "none";
             },3000)
        }else{
            this.props.signUp(this.state);
        }
    }

    uploadPic(e){
        const file = e.currentTarget.files[0];
        this.props.uploadPic({file, uid: this.props.auth.uid});
    }


    componentDidMount(){
        if(this.props.auth.uid){
            this.props.getImage(this.props.auth.uid);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.auth.uid !== this.props.auth.uid){
            if(this.props.loginSuccess){
                this.closeModal("login");
             }else if(this.props.signupSuccess){
                this.closeModal("signup");
            }
        }        
        if(this.props.auth.uid && this.props.auth.uid !==  prevProps.auth.uid ){
            this.props.getImage(this.props.auth.uid);
        }

    }

    uploadDecoy(){
        this.uploadPicRef.current.click();
    }
   
    render(){
        const {auth} = this.props;
        let buttons;
        if(auth.uid){
          buttons =   (
           <div style={{width: "100%"}}>
                 <div className="row u-margin-bottom-big homePage--div2">
                        <div className="center-hrz homePage--profilePic--container" style={{background: `url(${this.props.imageSrc})`}} ref={this.imgRef}>
                           {/* <img className="homePage--profilePic" src={this.props.imageSrc} alt="logo" ref={this.imgRef}/> */}
                        <button onClick={this.uploadDecoy} className="homePage--pencil"><img src={Pencil} alt="" /></button>
                        </div>
                        <input type="file" onChange={this.uploadPic} ref={this.uploadPicRef} style={{display: "none"}}/>
                     <div className="" style={{textAlign: "left"}}>
                         <div className="center-hrz">
                            <h1 className="screen__header white-text" style={{width: "100%", textAlign: "center", marginBottom: "0"}}>{this.props.profile.name}</h1>
                         </div>
                        <div className="homePage--details">
                            <p className=" bigger-text">TeamID: {this.props.profile.teamID}</p>
                            <p className="bigger-text">UserID: {this.props.auth.uid}</p>
                            <p className="bigger-text">email: {this.props.profile.emailID}</p>
                            <Button name="Log Out" specClasses="button__red" callBack={e=>{ this.logout(); }}/>
                        </div>
                     </div>

                </div>  

             </div>        
            )
            
        }else{
            buttons = <div className="center-hrz--col u-margin-bottom-big">
                        <img className="homePage--logo u-margin-bottom-big" src={btIcon} alt="logo"/>
                        <div className="row homePage--row">
                                <Button name="Log In"  specClasses="button__yellow u-margin-right" callBack={(event)=>{
                                    this.openModal("login")
                            }}/>
                                <Button name="Sign Up" specClasses="button__green u-margin-right"callBack={(event)=>{
                                        this.openModal("signup")
                                }}/>
                        </div>

            </div>

            
        }
        return(
            <div className="homePage">
                 <div className="center-hrz-col homePage--div" style={{width: "100%"}}>
                            <div className="row homePage--row">
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
                                <input type="email" className="input-text" id="login-email" name="email" placeholder="Email*"  onChange={this.handleChange} required/>
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
                        
                         <form className="center-hrz--col" onSubmit={this.signUp} style={{width: "80%"}}>
                         <div className="input-group">
                                <input type="text" name="nameSU" className="input-text" id="signup-name" placeholder="Full Name*" required  onChange={this.handleChangeSU}/>
                                <label htmlFor="signup-name" className="input-label">Name</label>
                            </div>
                            <div className="input-group">
                                <input type="email" name="emailSU" className="input-text" id="signup-email" placeholder="Email*" onChange={this.handleChangeSU} required/>
                                <label htmlFor="signup-email" className="input-label">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" className="input-text" name="passwordSU" id="signup-passowrd" placeholder="Password*" onChange={this.handleChangeSU} required/>
                                <label htmlFor="signup-passowrd" className="input-label">Password*</label>
                            </div>
                            
                            <div className="radio-field u-margin-bottom">
                                <input type="radio" name="user-team" id="new team" value="new" className="radio radioSU"/>
                                <label htmlFor="new team" className="radio-label" value="existing" tabIndex="2" onClick={()=>{this.askId("new")}}>New Team</label>
                                <input type="radio" name="user-team" id="exisiting-team" className="radio radioSU"/>
                                <label htmlFor="exisiting-team" className="radio-label" tabIndex="2" onClick={()=>{this.askId("existing")}}>existing team</label>
                            </div>
                            <div id="id-div" style={{display: "none"}} ref={this.idDivRef}>
                              <input type="text" className="input-text" name="teamIDSU" id="team-id" placeholder="ID*" onChange={this.handleChangeSU} ref={this.teamIDRef}/>
                              <label htmlFor="team-id" className="input-label">ID</label>
                            </div>
                            <p className="red-text normal-text" style={{display: "none"}} ref={this.signUpErrorRef}>Please select one of the radio buttons</p>
                            {this.props.authError ? <p className="red-text bigger-text">{this.props.authError}</p>: null}
                            <input type="submit" value="sign up" className="button button__green"/> 
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
        loginSuccess: state.auth.loginSuccess,
        signupSuccess: state.auth.signupSuccess,
        profile: state.firebase.profile,
        imageSrc: state.imageSrc,
        imageUpload: state.imageUpload
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);