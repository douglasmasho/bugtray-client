import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
// import Main from "./components/main";
import "./sass/main.scss";
import ScrollToTop from "./components/scrollToTop";
import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./redux/reducer";
import {Provider} from "react-redux";
import App from "./components/App";
import thunk from "redux-thunk";
import {reduxFirestore, getFirestore, createFirestoreInstance} from "redux-firestore";
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";
import {useSelector} from "react-redux";
import {isLoded} from "react-redux-firebase";


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig)
    )
);

const profileProps = {
    useFirestoreForProfile: true,
    userProfile: "users"
}

    const rrfProps = {
        firebase,
        config: fbConfig,
        config: profileProps,
        dispatch: store.dispatch,
        createFirestoreInstance
      };
      

const AuthIsLoaded = props=>{
    const {children} = props;
    const auth = useSelector(state=>state.firebase.auth);
    if(!isLoaded(auth)) return <div>Splash screen</div>
    return children

}

ReactDOM.render(
     <Provider store={store}>
         <ReactReduxFirebaseProvider {...rrfProps} >
            <BrowserRouter>
                <ScrollToTop/>
                <AuthIsLoaded>
                  <App/>
                </AuthIsLoaded>
            </BrowserRouter>
         </ReactReduxFirebaseProvider>
    </Provider>,
     document.getElementById("root"));


