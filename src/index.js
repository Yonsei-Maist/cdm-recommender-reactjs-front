/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.16
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

/**
 * @category Index.js
 * @module index
 * @description Inside this module for start up the application, there is a global method for handling event when user clicks on marked word.
 * Note: it is global['handleOnClickMarkedWord'] not global[undefined]
 * @requires 'serviceWorker'
 * @requires 'core-js/es6/map'
 * @requires 'core-js/es6/set'
 * @requires './MainApp'
 * @requires './index.css'
 * @requires 'bootstrap/dist/css/bootstrap.min.css'
 */
import * as serviceWorker from "./serviceWorker";
import "core-js/es6/map"; // for lower version of browser
import "core-js/es6/set";
import MainApp from "./MainApp";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/mdb-free.scss";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { MainApp };
