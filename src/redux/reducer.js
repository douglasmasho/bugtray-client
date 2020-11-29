import testArr from "../data/testArr";
import {combineReducers} from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import UserIcon from "../assets/profile.jpg";
import { nanoid } from 'nanoid';



function comments(state = [], action){
    switch(action.type){
        case "STRING": return state.concat([action.comment]);
        default: return state
    }     
}

///////////////////////////////
function test(state = testArr, action){
    return state
}
///////////////////////////////

const initBugs = [
    {deadLine: "2020-05-10",name: "DripFootwear", id:0, teamID: 1,title: "LocalStorage", status: "new", devs: [ {name: "Asiya Yang", userPic:"someUrl", emailID: "something@somethingmail.com", userID:123},{name: "Janus Dover", userPic:"someUrl", emailID: "thing@thingmail.com",  userID: 321}, {name: "Aiko Fatima", userPic:"someUrl", emailID: "some@somemail.com", userID: 312} ]},
    {deadLine: "2020-09-30",name: "Kronos", id:1, teamID: 1,title:"Navigation", status: "fixed", devs: [ {name: "Asiya Yang", userPic:"someUrl", emailID: "something@somethingmail.com", userID:123},{name: "Janus Dover", userPic:"someUrl", emailID: "thing@thingmail.com",  userID: 321}]},
    {deadLine: "2020-09-30",name: "Athena", id:2, teamID: 1,title: "Formula", status: "under review", devs: [ {name: "Asiya Yang", userPic:"someUrl", emailID: "something@somethingmail.com", userID:123}, {name: "Aiko Fatima", userPic:"someUrl", emailID: "some@somemail.com", userID: 312} ]}
]
const bugs = (state = initBugs, action)=>{
    switch(action.type){
        case "ADD_BUG": 
        return [...state, action.bug]
        default: 
        return state
    }
}
///////////////////////////////

const myInitBugs = [
    {deadLine: "2020-05-10",name: "DripFootwear", id:0, title: "LocalStorage", status: "new"},
    {deadLine: "2020-09-30",name: "Kronos", id:2, title:"Navigation", status: "fixed"},
]

const myBugs = (state = myInitBugs,action)=>{
    switch(action.type){
        default: return state;
    }
}
///////////////////////////////

const initUsers = [
    {name: "Asiya Yang", userPic:"someUrl", emailID: "something@somethingmail.com", userID:123},
    {name: "Janus Dover", userPic:"someUrl", emailID: "thing@thingmail.com",  userID: 321},
    {name: "Aiko Fatima", userPic:"someUrl", emailID: "some@somemail.com", userID: 312}
];

const devs = (state=initUsers, action)=>{
    switch(action.type){
        default: return state
    }
}

const initAuth = {
    authError: null,
    loginSuccess: false,
    signupSuccess: false,
}

const authReducer = (state=initAuth, action)=>{
    switch(action.type){
        case "SIGNIN_SUCCESS": 
        console.log("Signin success");
        return {
            ...state,
            authError: null,
            loginSuccess: true,
            
        }
        case "SIGNIN_ERROR":
            console.log("signin error");
            return {
                ...state,
                authError: action.error.message,
                loginSuccess: false,
               signupSuccess: false,

            }
        case "SIGNOUT_SUCCESS":
            console.log("Signed out successfully")
            return {
                ...state,
                loginSuccess: false,
                signupSuccess: false,
            }
         case "SIGNUP_SUCCESS":
            return {
                ...state,
                signupSuccess: true,
            }
         case "SIGNUP_ERROR":
             return {
                 ...state,
                 authError: action.err.message,
                 loginSuccess: false,
                 signupSuccess: false,
             }   
         

        default: return state    
    }
}

const initSrc = "https://firebasestorage.googleapis.com/v0/b/bugtray-b4725.appspot.com/o/generic%2Fbticon.svg?alt=media&token=512eed64-9d1a-4ecd-a51a-6620a1469b43";

const imageReducer = (state = null, action)=>{
    switch(action.type){
        case "URL_SUCCESS":
            console.log(action.url);
            return action.url;
        case "NO_PROFILE_PIC":
            return initSrc;
         default: return state    
    }
}

const initStr = "";
const imageUploadReducer = (state = initStr, action)=>{
    switch(action.type){
        case "UPOAD_SUCCESS":
            return `${nanoid(9)}`
         default: return state   
    }
}

const initTeamBugs = [];

const teamBugs = (state = initTeamBugs, action)=>{
    switch(action.type){
        case "GET_TEAMBUGS":
            return action.teamBugs
        default: return state
    }
}

const teamUsers = (state= [], action)=>{
    switch(action.type){
        case "GET_TEAMUSERS":
            return action.teamUsers
        default: return state
    }
}

const bugDevs = (state = [], action)=>{
    switch(action.type){
        case "GET_BUGDEVS":
            console.log(action.devs)
            return action.devs
            default: return state
    }
}

const uploadPercentage = (state = 0, action)=>{
    switch(action.type){
        case "UPLOAD_PERCENTAGE":
            return action.percentage
            default: return state
    }
}


const rootReducer = combineReducers({comments, test, bugs, myBugs, devs, firestore: firestoreReducer, firebase: firebaseReducer, auth: authReducer, imageSrc: imageReducer, imageUpload: imageUploadReducer, teamBugs, teamUsers, bugDevs, uploadPercentage})

export default rootReducer;