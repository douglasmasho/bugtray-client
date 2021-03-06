import UserIcon from "../assets/profile.jpg";
import {nanoid} from "nanoid";
import imageCompression from "browser-image-compression";
// import io from "socket.io-client";

// const socket = io.connect("/");

export function addComment(commentObj, bugID){
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        
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

///here
export function addScreenshot(screenshotObj, bugID, screenshotFile){
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const screenshotID = nanoid(12);
        let screenshotSrc;
        //first upload the screenshot to firebase storage
        ///compress the screenshot file
        console.log(`Original file instance of blob =>${screenshotFile instanceof Blob}`);
        console.log(`Original file size =>${screenshotFile.size /1024/1024} MB`);

        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }

          imageCompression(screenshotFile, options).then(resp=>{
              console.log(resp);
              console.log(`Compressed file instance of blob =>${resp instanceof Blob}`);
              console.log(`Compressed file size =>${resp.size /1024/1024} MB`);

       const uploadTask = firebase.storage().ref(`screenshots/${bugID}/${screenshotID}.jpg`).put(screenshotFile);
        uploadTask.on("state_changed", snapshot=>{
            let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
    
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
     }).catch(e=>console.log(e))




    }
    


}



export const testAddPic = (file)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        firebase.storage().ref("screenshots/someID/pic.jpg").put(file).then(()=>{
            console.log("it worked")
        }).catch(e=>{
            console.log(e)
        })
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
            // socket.emit("email_devs", {...bug, bugID, initComment: xtra.initComment});
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
        }).catch(e=>{
            console.log(e);
            dispatch({type: "SIGNIN_ERROR", e})
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

//here
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
                console.log(`Original file instance of blob =>${blob instanceof Blob}`);
                console.log(`Original file size =>${blob.size /1024/1024} MB`);
        
                const options = {
                    maxSizeMB: 0.2,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                  }

                 return imageCompression(blob, options).then(resp=>{
                    console.log(`Compressed file instance of blob =>${resp instanceof Blob}`);
                    console.log(`Compressed file size =>${resp.size /1024/1024} MB`);
                    return firebase.storage().ref(`users/${uid}/profile.jpg`).put(resp).then(()=>{
                        dispatch({type: "UPLOAD_SUCCESS"})
                    }) 
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
            // console.log("success! :)")
            window.location.reload();
        }).catch(e=>{
            dispatch({type: "SIGNUP_ERROR",e});
            console.log(e)

        })
    }
}

///here
export const uploadPic = ({file, uid})=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        console.log(`Original file instance of blob =>${file instanceof Blob}`);
        console.log(`Original file size =>${file.size /1024/1024} MB`);
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }
        imageCompression(file, options).then(resp=>{

           return firebase.storage().ref(`users/${uid}/profile.jpg`).put(resp).then(()=>{
                dispatch({type: "UPLOAD_SUCCESS"})
                window.location.reload();
            })
        }).catch(e=>{
            console.log(e)
        })

    }
}

export const getImage = (uid)=>{ /////////////////////////////////////////////////////////////////////////////////////
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        console.log("got image")
        const firebase = getFirebase();
        firebase.storage().ref(`users/${uid}/profile.jpg`).getDownloadURL().then(resp=>{
            dispatch({type: "URL_SUCCESS", url: resp})
        })
    }
}


// export const getTeamBugs = (teamID)=>{
//     return (dispatch, getState, {getFirestore})=>{
//         console.log("got them")
//         const firestore = getFirestore();
//         let teamBugs = [];
       
//         firestore.collection("bugs").where("teamID", "==", teamID).get().then(querySnapshot=>{
//             querySnapshot.forEach(doc=>{
               
//                 teamBugs.push({
//                     ...doc.data(),
//                     id: doc.id
//                 })
//             })
//         }).then(()=>{
//             dispatch({type: "GET_TEAMBUGS", teamBugs})
//         }).catch(e=>{
//             console.log(e);
//         })
//     }
// }


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
            devArr.forEach(devID=>{
               let objToBeRemoved

                firestore.collection("userProjects").doc(devID).get().then(doc=>{
                    objToBeRemoved = doc.data().projectArr.find(e=>e.id=== bugID);
                    console.log(objToBeRemoved)
                }).then(()=>{
                   return firestore.collection("userProjects").doc(devID).update({
                        projectArr: firestore.FieldValue.arrayRemove(objToBeRemoved)
                    })
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


export const assignToDevs = (selectedArr, unSelectedArr, bugID, unSelectedObjs, selectedObjs)=>{
   return (dispatch,getState, {getFirebase, getFirestore})=>{
       console.log("executed")
       const firestore = getFirestore();
       //get the bugObj
       let bugObj = {};


       firestore.collection("bugs").doc(bugID).get()
       .then(resp=>{
           bugObj = resp.data();
            selectedArr.forEach(devID=>{
                firestore.collection("userProjects").doc(devID).get().then(doc=>{
                    if(!doc.data().projectArr.some(e=> e.id === bugID)){   
                        //add the bug to the array
                        firestore.collection("userProjects").doc(devID).update({
                            projectArr: firestore.FieldValue.arrayUnion({
                                ...bugObj,
                                id: bugID
                            })
                        }).then(()=>{
                            //add the devObj to the dev field  of the bug doc
                            const devObj = selectedObjs.find(el=>el.id === devID);
                            firestore.collection("bugs").doc(bugID).update({
                                devs: firestore.FieldValue.arrayUnion(devObj)
                            })
                        }).catch(e=>{
                            console.log(e)
                        })        
                    }
                })
            })


            unSelectedArr.forEach(devID=>{
                let objToBeRemoved;
                firestore.collection("userProjects").doc(devID).get().then(doc=>{
                    if(doc.data().projectArr.some(e=>e.id === bugID)){
                        //romove the bug from the array
                        firestore.collection("userProjects").doc(devID).get().then(doc=>{
                            objToBeRemoved  = doc.data().projectArr.find(obj=> obj.id === bugID);
                            console.log(objToBeRemoved);
                         }).then(()=>{
                           return firestore.collection("userProjects").doc(devID).update({
                                projectArr: firestore.FieldValue.arrayRemove(objToBeRemoved)
                            })
                         }).then(()=>{
                                //remove from the bug, the devObjs
                                const devObj = unSelectedObjs.find(el=>el.id === devID);
                                console.log(devObj)
                                firestore.collection("bugs").doc(bugID).update({
                                    devs: firestore.FieldValue.arrayRemove(devObj)
                                })
                         }).catch(e=>{
                             console.log(e)
                         })


                    }
                })
            })
       })

   }

}


export const deleteBug = (bugID)=>{
    return (dispatch ,getState, {getFirebase, getFirestore}) =>{
        console.log(bugID);
        const firestore = getFirestore();
        const firebase = getFirebase();
        let devsArr, objToBeRemoved;
        //remove from Collections
        ///bugs
        //first get the ids of the devs that were assigned the bug
        //and also the screenshotIDs, then delete them


        firestore.collection("screenshots").doc(bugID).get().then(doc=>{
            const scrnshtIDsArr =  doc.data().screenshots.map(scrnsht=>scrnsht.screenshotID);
            console.log(scrnshtIDsArr);
            scrnshtIDsArr.forEach(id=>{
                firebase.storage().ref(`screenshots/${bugID}/${id}.jpg`).delete().then(()=>{
                    console.log("the screenshot has been deleted")
                }).catch(e=>{
                    console.log(e);
                })
            })
        }).then(()=>{
          return firestore.collection("bugs").doc(bugID).get().then(doc=>{
            devsArr = doc.data().devs.map(dev=>dev.id);
            console.log(devsArr);
        }).then(
            ()=>{
            firestore.collection("bugs").doc(bugID).delete().then(()=>{
                console.log("the bug doc has been deleted");
                ///comments
                return firestore.collection("comments").doc(bugID).delete()
            }).then(()=>{
            ///screenshots
                console.log("the comments doc has been deleted");
                return firestore.collection("screenshots").doc(bugID).delete()
            })
            .then(()=>{
                console.log("the screenshots doc has been deleted")
                ///userProjects
                devsArr.forEach(devID=>{
                    firestore.collection("userProjects").doc(devID).get().then(doc=>{
                        objToBeRemoved = doc.data().projectArr.find(bug=>bug.id === bugID);
                        console.log(objToBeRemoved);
                            ///userProjects                
                        firestore.collection("userProjects").doc(devID).update({
                            projectArr: firestore.FieldValue.arrayRemove(objToBeRemoved)
                        })
                    })
                })
            }).catch((e)=>{
             console.log(e)
            })
        })

        })
    }
}


export const deleteComment = (commentID, bugID)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        //first get the comment object from firestore,
        firestore.collection("comments").doc(bugID).get().then(doc=>{
            const commentObj = doc.data().comments.find(com=>com.commentID === commentID);
        ////then delete it
             return firestore.collection("comments").doc(bugID).update({
                 comments: firestore.FieldValue.arrayRemove(commentObj)
             }).then(()=>{
                 console.log("the comment has been deleted")
             }).catch(e=>{
                 console.log(e)
             })
        })
    }
}



export const deleteScreenshot = (screenshotID, bugID)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        //delete the screenshot from firebase storage
        firebase.storage().ref(`screenshots/${bugID}/${screenshotID}.jpg`).delete().then(()=>{
            console.log("the screenshot has been deleted")
        })
        //get the screenshot object form firestore
        firestore.collection("screenshots").doc(bugID).get().then(doc=>{
            const screenshotObj = doc.data().screenshots.find(scree=>scree.screenshotID === screenshotID);
            console.log(screenshotObj);
            firestore.collection("screenshots").doc(bugID).update({
                screenshots: firestore.FieldValue.arrayRemove(screenshotObj)
            }).then(()=>{
                console.log("the screenshot object has been removed")
            }).catch(e=>{
                console.log(e)
            })
        })
    }
}

// }///do a getImage but for multiple users, instead of receiving a sgle UID, receive an array of UIDs, then forEach of the UIDs, get the profile pic urls, then push them into an array, Each item in the array will be an object, {UID,url}.
// you can then dispatch this new array tot the reducer, where it becomes state. When reading the state in your application, Use the UIDs of the members to get the right URL from the array. 