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
    return (dispatch, getState)=>{
        //run firebase function here
        dispatch({
            type: "ADD_BUG",
            bug
        })
    }
}
