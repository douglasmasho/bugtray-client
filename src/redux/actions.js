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
        firestore.collection("bugs").add({
            ...bug
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

export const signUp = (newUser)=>{
    let uid;
    return (dispatch, getState, {getFirestore, getFirebase})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(newUser.emailSU, newUser.passwordSU).then(
            resp=>{
                uid = resp.user.uid;
                return firestore.collection("users").doc(resp.user.uid).set({
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
            getImage(uid);
        }) .catch((err)=>{
            console.log(err)
        })
    }
}

export const getImage = (uid)=>{
    return (dispatch, geState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        // console.log(uid)
        firebase.storage().ref(`users/${uid}/profile.jpg`).getDownloadURL().then(resp=>{
            console.log(resp);
            dispatch({type: "URL_SUCCESS", url: resp})
        }).catch(err=>{
            console.log(err)
        })
    }
}