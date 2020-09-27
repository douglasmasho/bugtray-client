import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
// import Main from "./components/main";
import "./sass/main.scss";
import ScrollToTop from "./components/scrollToTop";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducer";
import {Provider} from "react-redux";
import App from "./components/App";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><BrowserRouter><ScrollToTop/><App/></BrowserRouter></Provider>, document.getElementById("root"));


