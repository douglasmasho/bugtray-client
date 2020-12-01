import React, {Component} from "react";
import {Route} from "react-router-dom";
import {Link} from "react-router-dom"
import btLogo  from "../assets/btlogo.svg";
import Menu from "./menu";
import BottomDiv from "./bottomDiv";
import AddBugForm from "./addBugForm";
import ManageBug from "./manageBug";
import AssignToDevs from "./assignToDevs";
import AssignedDevs from "./assignedDevs";
import CommentPage from "./commentPage";
import MenuIcon from "../assets/menu.svg";
import BackIcon from "../assets/back.svg"
import ScreenshotsPage from "./screenshotsPage";
import HomePage from "./homePage";
import ChangeStatus from "./changeStatus";
import AllBugsDB from "./AllBugsDB";
import MyBugsDB from "./MyBugsDB";
import {Redirect} from "react-router-dom";
import Developers from "./developers";
import ScrollToTop from "./scrollToTop";
import Loading from "./Loading";
import {connect} from "react-redux";



class Main extends Component{
    constructor(){
        super();
        this.linkClick = this.linkClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.dashboardRef = React.createRef();
        this.bottomDivRef = React.createRef();
        this.expandNav = this.expandNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.navRef = React.createRef();
        this.navCloseRef = React.createRef();
    }
    linkClick(){
        let currentLink = document.querySelector(".activeLink");
        if(currentLink){
            currentLink.classList.remove("activeLink")
        }
    }

    componentDidMount(){
        let menuLinks = document.querySelectorAll(".menu--link");
        const x = window.matchMedia("(max-width: 600px)");

        //query function 
        let closeNavinQ = (x)=>{
            if(x.matches){
                menuLinks.forEach((e)=>{
                    e.addEventListener("click", this.closeNav);
                })
            }
        }

    //create the initial listener, runs when the app is started
    closeNavinQ(x);
    //create the listener for state change, that runs the query function on every state change
    x.addListener(closeNavinQ);
    x.addListener(()=>{
        window.location.reload();
    })
    }
    expandNav(){
        const nav = this.navRef.current; ///expand this;
        const menus = document.querySelectorAll(".menu--sub");///give these a display of block;
        const bottomDiv =this.bottomDivRef.current//give this a display of block;
        const closeNav = this.navCloseRef.current;

        menus.forEach(e=>{
            e.style.display= "block";
        })

        bottomDiv.style.display = "block";
        bottomDiv.style.opacity = "100%";

        nav.style.animation = "expand 0.4s forwards";
        closeNav.style.display = "block";
    }

    closeNav(){
        const nav = this.navRef.current; ///expand this;
        const menus = document.querySelectorAll(".menu--sub");///give these a display of block;
        const bottomDiv = this.bottomDivRef.current//give this a display of block;
        const closeNav = this.navCloseRef.current;
        
        menus.forEach(e=>{
            e.style.display= "none";
        })

        bottomDiv.style.display = "none";
        bottomDiv.style.opacity = "0";

        nav.style.animation = "collapse 0.3s forwards";
        closeNav.style.display = "none";
    }

    
    scrollToBottom(){
        this.dashboardRef.current.scrollTo(0, this.dashboardRef.current.scrollHeight);
    }

    scrollToTop(){
        this.dashboardRef.current.scrollTo(0,0);
    }

    render(){
        return (
            <div className="home">
                <ScrollToTop scrollToTop={this.scrollToTop}/>
                <div id="navigation" ref={this.navRef}>
                    <img src={BackIcon} alt="" className="nav--icon" id="nav--close" onClick={this.closeNav} ref={this.navCloseRef}/>
                      <Link to="/" onClick={this.linkClick}><img className="nav__logo" src={btLogo} alt="logo"/></Link>
                      <Menu/>
                      <BottomDiv ref={this.bottomDivRef} profile={this.props.profile}/>
                </div>
                
                <div id="dashboard" ref={this.dashboardRef}>
                <img src={MenuIcon} className="nav--icon" id="nav--open" alt="" onClick={this.expandNav}/>


                    <Route exact path="/" render={()=>(
                        <HomePage/>
                    )}/> 

                    
                    <Route exact path="/allBugs" component={AllBugsDB}/>  

                     <Route exact path="/myBugs" component={MyBugsDB}/> 

                    <Route exact path="/developers" component={Developers}/>

                    <Route extact path="/addBug" render={({history})=>{
                        if(!this.props.auth.uid){
                                return <Redirect to="/"/>
                         }
                        return (
                        <div className="screen">
                        <AddBugForm history={history} addBug={this.props.addBug}/>
                    </div>)
                    }}/>

                    <Route exact path="/manageBug/:name/:id" render={(routeArgs)=>{
                        if(!this.props.auth.uid){
                                 return <Redirect to="/"/>
                        }
                       return  <ManageBug routeArgs={routeArgs}/>
                    }      
                    }/>


                    <Route exact path="/assignedDevs/:name?/:id?" render={(routeArgs)=>{
                         if(!this.props.auth.uid){
                                     return <Redirect to="/"/>
                            }
                       return   <AssignedDevs routeArgs={routeArgs}/>   
                    }
                    }/>

                    <Route exact path="/comments/:name?/:id?" render={(routeArgs)=>{
                        if(!this.props.auth.uid){
                                     return <Redirect to="/"/>
                         }
                       return   <CommentPage  {...this.props} routeArgs={routeArgs}  scrollToBottom={this.scrollToBottom}/>   
                    }
                    }/>

                    <Route exact path="/assignToDevs/:name/:id" render={(routeArgs)=>{
                        if(!this.props.auth.uid){
                            return <Redirect to="/"/>
                       }
                      return  <AssignToDevs routeArgs={routeArgs}/>
                    }
                    }/>

                    <Route exact path="/changeStatus/:name/:id" render={(routeArgs)=>{
                            if(!this.props.auth.uid){
                                    return <Redirect to="/"/>
                             } 
                       return   <ChangeStatus routeArgs={routeArgs}/>   
                    }
                    }/>

                   <Route exact path="/screenshots/:name/:id" render={(routeArgs)=>{
                            if(!this.props.auth.uid){
                                 return <Redirect to="/"/>
                             } 
                        return  <ScreenshotsPage routeArgs={routeArgs} scrollToBottom={this.scrollToBottom}/>
                   }
                    }/>

                    <Route exact path="/loading" component={Loading}/>
                </div>
                </div>

        )
    }

}

const mapStateToProps = state=>({
    profile: state.firebase.profile,
})

export default connect(mapStateToProps)(Main)