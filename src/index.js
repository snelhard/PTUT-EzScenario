import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Menu from './Components/Menu';
// import index from "./js/index";
// import Page from './Page';
ReactDOM.render( <Menu/ > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// import React from "react";
// import { render } from "react-dom";
// import { Provider } from "react-redux";
// import store from "./js/store/index";
// import App from "./js/components/App";
// import index from "./js/index";

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );