import testArr from "../data/testArr";
import {combineReducers} from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";


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
    loginSuccess: false
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
                authError: action.error,
                loginSuccess: false,
            }
        case "SIGNOUT_SUCCESS":
            console.log("Signed out successfully")
            return {
                ...state,
                loginSuccess: false,
            }
        default: return state    
    }
}



const rootReducer = combineReducers({comments, test, bugs, myBugs, devs, firestore: firestoreReducer, firebase: firebaseReducer, auth: authReducer})

export default rootReducer;