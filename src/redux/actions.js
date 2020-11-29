import { getFirebase } from "react-redux-firebase";
import UserIcon from "../assets/profile.jpg";
import {nanoid} from "nanoid";
import io from "socket.io-client";
import { firestore } from "firebase";
import Screenshot from "../components/screenshot";

const socket = io.connect("/");

export function addComment(commentObj, bugID){
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        // console.log(commentObj);
        
        firebase.storage().ref(`users/${commentObj.authorID}/profile.jpg`).getDownloadURL().then(resp=>{
            return firestore.collection("comments").doc(bugID).update({
                comments: firestore.FieldValue.arrayUnion({
                    ...commentObj,
                    imgSrc: `${resp}`
                })
            })
        }).catch(e=>{
            console.log(e)
        })
    }
}

export function addScreenshot(screenshotObj, bugID, screenshotFile){
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const screenshotID = nanoid(12);
        let screenshotSrc, authorPic;
        //first upload the screenshot to firebase storage
        const uploadTask = firebase.storage().ref(`screenshots/${bugID}/${screenshotID}.jpg`).put(screenshotFile);

        uploadTask.on("state_changed", snapshot=>{
            let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            // console.log(document.querySelector("#uploader"))
            dispatch({
                type: "UPLOAD_PERCENTAGE",
                percentage
            })
         });

        uploadTask.then((resp)=>{ 
         
            return firebase.storage().ref(`screenshots/${bugID}/${screenshotID}.jpg`).getDownloadURL()
        }).then(resp=>{
            screenshotSrc = resp;
            
            return firebase.storage().ref(`users/${screenshotObj.authorID}/profile.jpg`).getDownloadURL()
        }).then(resp=>{
          
            return firestore.collection("screenshots").doc(bugID).update({
                screenshots: firestore.FieldValue.arrayUnion({
                    ...screenshotObj,
                    authorPic: `${resp}`,
                    screenshotSrc: `${screenshotSrc}`,
                    screenshotID
                })
            })

        })
        .catch(e=>{
            console.log(e)
        })

    }
    


}



export const testAddPic = (file)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        firebase.storage().ref("screenshots/someID/pic.jpg").put(file).then(()=>{
            console.log("it worked")
        }).catch("it didnt work")
    }
}
export const addBug =(bug, xtra)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        //run firebase function here;
        const firestore = getFirestore();
        const firebase = getFirebase();
        let bugID, imgSrc, screenshotLink;
        const screenshotID = nanoid(12);
       
        ///use nanoid as bug id so that you can have acces to it in the second promise.

        ///first get the imageSrc
    
        // console.log(uid)
        firebase.storage().ref(`users/${xtra.uid}/profile.jpg`).getDownloadURL().then(resp=>{
            imgSrc = resp;
            
            return  firestore.collection("bugs").add({
                ...bug
                ///also run another firestore promise to add the bug id to the teamBugs array
            })
        })
        .then((docRef)=>{
            
            bugID = docRef.id;
            const commentID = nanoid(9)
            socket.emit("email_devs", {...bug, bugID, initComment: xtra.initComment});
            return firestore.collection("comments").doc(docRef.id).set({
                comments: [{
                    authorID: xtra.uid,
                    comment: xtra.initComment,
                    imgSrc: `${imgSrc}`,
                    authorName: xtra.name,
                    commentID,
                    timeStamp: new Date()
                }],
            })
        }).then(()=>{
           return  firebase.storage().ref(`screenshots/${bugID}/${screenshotID}.jpg`).put(xtra.initScreenshot).then((resp)=>{
               console.log("it worked", resp);
           }).catch((e)=>{
               console.log(e)
           })
        }).then(()=>{ ///get the screenshot url
           return firebase.storage().ref(`/screenshots/${bugID}/${screenshotID}.jpg`).getDownloadURL().then(resp=>{
                screenshotLink = resp;
            })
        }).then(()=>{
          
            return firestore.collection("screenshots").doc(bugID).set({
               screenshots:[{
                    screenshotID: screenshotID,
                    authorID: xtra.uid,
                    authorName: xtra.name,
                    authorPic: `${imgSrc}`,
                    notes: xtra.notes,
                    screenshotSrc: `${screenshotLink}`,
                    timeStamp: new Date(),
                   }] 
            })
        }).then(()=>{
            bug.devs.forEach(dev=>{
                firestore.collection("userProjects").doc(dev.id).update({
                    projectArr: firestore.FieldValue.arrayUnion({
                        ...bug,
                        id: bugID
                    })
                }).then(()=>{
                    console.log("it worked")
                }).catch((e)=>{
                    console.log(e)
                })
            })
            dispatch({
                type: "ADD_BUG",
                bug
            })
        }).catch(e=>{
            console.log(e)
        })




    }
}

export const signIn = (credentials)=>{
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
        
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
            dispatch({type: "SIGNIN_SUCCESS"})
        }).catch(err=>{
            console.log(err);
            dispatch({type: "SIGNIN_ERROR", err})
        })
    }
}

export const signOut = ()=>{
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();

        firebase.auth().signOut().then(()=>{
            console.log("signout success")
            dispatch({type: "SIGNOUT_SUCCESS"})
        }).catch(error=>{
            dispatch({type: "SIGNOUT_ERROR", error})
        })
    }
}


export const signUp = (newUser,type)=>{
    let uid;
    return (dispatch, getState, {getFirestore, getFirebase})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(newUser.emailSU, newUser.passwordSU).then(
            resp=>{
                uid = resp.user.uid;
                return firestore.collection("users").doc(uid).set({
                    name: newUser.nameSU,
                    emailID: newUser.emailSU,
                    teamID: newUser.teamIDSU,
                    userPic: ""
                })           
            }
        ).then(()=>{
            fetch(UserIcon).then(resp=>{
                return resp.blob()
            }).then(blob=>{
                return firebase.storage().ref(`users/${uid}/profile.jpg`).put(blob).then((resp)=>{
                    dispatch({type: "UPLOAD_SUCCESS"})
                })  
            })
        }).then(()=>{
            
            return firestore.collection("userProjects").doc(uid).set({
                projectArr: [],
            })
        }).then(()=>{
            switch(newUser.type){
                case "new":
                    return firestore.collection("teamBugs").doc(newUser.teamIDSU).set({
                        bugs: []
                    }).then(()=>{
                        return firestore.collection("teamUsers").doc(newUser.teamIDSU).set({
                            users: [uid]
                        })
                    })
                    default: //
            }
        }).then(()=>{
            
            dispatch({type: "SIGNUP_SUCCESS"});
            console.log("success! :)")
        }).catch(err=>{
            dispatch({type: "SIGNUP_ERROR",err});
            console.log("error :(")

        })
    }
}

export const uploadPic = ({file, uid})=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        // console.log(file, uid)
        const firebase = getFirebase();
        firebase.storage().ref(`users/${uid}/profile.jpg`).put(file).then((resp)=>{
            dispatch({type: "UPLOAD_SUCCESS"})
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const getImage = (uid)=>{ /////////////////////////////////////////////////////////////////////////////////////
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        // console.log(uid)
        firebase.storage().ref(`users/${uid}/profile.jpg`).getDownloadURL().then(resp=>{
            dispatch({type: "URL_SUCCESS", url: resp})
        })
    }
}


export const getTeamBugs = (teamID)=>{
    return (dispatch, getState, {getFirestore})=>{
        const firestore = getFirestore();
        let teamBugs = [];
        // console.log(teamID)
        firestore.collection("bugs").where("teamID", "==", teamID).get().then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                // console.log(doc.id);
                teamBugs.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
        }).then(()=>{
            
            dispatch({type: "GET_TEAMBUGS", teamBugs})
        }).catch(err=>{
            console.log(err);
        })
    }
}


export const getTeamUsers = (teamID)=>{
    let teamUsers = [];
    return (dispatch, getState, {getFirebase,getFirestore})=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        firestore.collection("users").where("teamID", "==", teamID).get().then(querySnapshot=>{     
            querySnapshot.docs.forEach((doc,index)=>{
                return firebase.storage().ref(`users/${doc.id}/profile.jpg`).getDownloadURL().then(resp=>{
                    teamUsers.push({
                        ...doc.data(),
                        id: doc.id,
                        imgSrc: resp
                    })
                }).then(()=>{
                    if(querySnapshot.size === teamUsers.length){
                      dispatch({type: "GET_TEAMUSERS", teamUsers});
                     
                    }
                })
            })
        })
    }
}

export const getBugDevs = (bugID)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection("bugs").doc(bugID).get().then(doc=>{
            const devs = doc.data().devs;
            dispatch({type: "GET_BUGDEVS", devs});
        })
    }
}


export const changeStatus = (bugID, status)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        let devArr = [];
        let oldBugObj = {};
        let newBugObj = {};
        firestore.collection("bugs").doc(bugID).get().then(bug=>{
            oldBugObj = bug.data();
            return firestore.collection("bugs").doc(bugID).update({
                status: status
            })
        }).then(()=>{
          return firestore.collection("bugs").doc(bugID).get().then(bug=>{
                  newBugObj = bug.data();
                 const devs = bug.data().devs.map(dev=>dev.id);
                 devArr = devs      
           })
        }).then(()=>{
            console.log(oldBugObj, newBugObj);
            devArr.forEach(devID=>{
                firestore.collection("userProjects").doc(devID).update({
                    projectArr: firestore.FieldValue.arrayRemove(oldBugObj)
                }).then(()=>{
                   return firestore.collection("userProjects").doc(devID).update({
                       projectArr: firestore.FieldValue.arrayUnion({
                           ...newBugObj,
                           id: bugID
                       })
                   })
                })
            })
        })
    }
}


// export const getImage = (uid)=>{  
//     return (dispatch, geState, {getFirebase, getFirestore})=>{
//         console.log("qwertyuiop")
//         const firebase = getFirebase();
//         // console.log(uid)
//         firebase.storage().ref(`users/${uid}/profile.jpg`).getDownloadURL().then(resp=>{
//             dispatch({type: "URL_SUCCESS", url: resp})
//         }).catch(err=>{
//             // console.log(err)
//         })
//     }
// }///do a getImage but for multiple users, instead of receiving a sgle UID, receive an array of UIDs, then forEach of the UIDs, get the profile pic urls, then push them into an array, Each item in the array will be an object, {UID,url}.
// you can then dispatch this new array tot the reducer, where it becomes state. When reading the state in your application, Use the UIDs of the members to get the right URL from the array. 