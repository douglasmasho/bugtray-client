import { getFirebase } from "react-redux-firebase";

export function addComment(comment){
    return (dispatch, getState)=>{
        console.log(comment);
        dispatch({
            type: "STRING",
            comment: comment
        })

    }
}

export const addBug =(bug)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        //run firebase function here;
        const firestore = getFirestore();
        ///use nanoid as bug id so that you can have acces to it in the second promise.
        firestore.collection("bugs").add({
            ...bug
            ///also run another firestore promise to add the bug id to the teamBugs array
        }).then(()=>{
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
        console.log(credentials)
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
            dispatch({type: "SIGNIN_SUCCESS"})
        }).catch(error=>{
            console.log(error);
            dispatch({type: "SIGNIN_ERROR", error})
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

export const resetPic = ()=>{
    return (dipatch)=>{
        dipatch({type:"RESET_PIC"})
    }
}

export const signUp = (newUser)=>{
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
                    case "existing":
                        return firestore.collection("teamUsers").doc(newUser.teamIDSU).update({
                            users: firestore.FieldValue.arrayUnion(uid)
                        })
            }
        }).then(()=>{
            console.log(uid, "second then");
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
            // console.log(resp)
            dispatch({type: "UPLOAD_SUCCESS"})
            window.location.reload();
        }) .catch((err)=>{
            console.log(err)
        })
    }
}

export const getImage = (uid)=>{
    return (dispatch, geState, {getFirebase, getFirestore})=>{
        console.log("qwertyuiop")
        const firebase = getFirebase();
        // console.log(uid)
        firebase.storage().ref(`users/${uid}/profile.jpg`).getDownloadURL().then(resp=>{
            dispatch({type: "URL_SUCCESS", url: resp})
        }).catch(err=>{
            // console.log(err)
        })
    }
}