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
import {ReactReduxFirebaseProvider, getFirebase} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig)
    )
);

    const rrfProps = {
        firebase,
        config: fbConfig,
        dispatch: store.dispatch,
        createFirestoreInstance
      };
      


ReactDOM.render(
     <Provider store={store}>
         <ReactReduxFirebaseProvider {...rrfProps} >
            <BrowserRouter>
                <ScrollToTop/>
                <App/>
            </BrowserRouter>
         </ReactReduxFirebaseProvider>
    </Provider>,
     document.getElementById("root"));


