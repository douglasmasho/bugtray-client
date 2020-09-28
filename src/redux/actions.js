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
