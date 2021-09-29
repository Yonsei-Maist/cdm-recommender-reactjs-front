/**
 * Main Application
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05. ~
 * @date 2020.10.23
 */

/**
 * @category Index.js
 * @module index
 * @description Inside this module for start up the application, there is a global method for handling event when user clicks on marked word.
 * Note: it is global['handleOnClickMarkedWord'] not global[undefined]
 * @requires react
 * @requires react-dom
 * @requires 'react-redux'
 * @requires './index.css'
 * @requires './App'
 * @requires './store'
 * @requires './actions/wordAction'
 * @requires './constants'
 * @requires './components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature'
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store";
import { getSimilarWordsRequest } from "./actions/wordAction";
import { METHOD_NAME_ONCLICK_MARKED_WORD } from "./constants";
import { getLookupPhrase } from "./components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature";
import { setServerBaseApiUrl } from "./actions/configAction";
import { API_URL_BASE } from "./constants";

/**
 * @type {Object}
 */
const store = configureStore();

/**
 * @type {Object}
 * @property {Function} METHOD_NAME_ONCLICK_MARKED_WORD method handler when user clicks on marked word
 * @param {string} markedWord marked word or highlight word
 */
global[METHOD_NAME_ONCLICK_MARKED_WORD] = (markedWord, quillRef) => {
  if (quillRef && quillRef.getSelection()) {
    const text = quillRef.getText();
    let isKeepSearchingRetain = true;
    let cursorStartIndex = quillRef.getSelection().index;
    // looking to the left until word without format markedWord
    while (isKeepSearchingRetain) {
      const format = quillRef.getFormat(cursorStartIndex);
      if (format.markedWord !== undefined) {
        const lookupPhrase = getLookupPhrase(
          text,
          cursorStartIndex,
          cursorStartIndex
        );
        cursorStartIndex = lookupPhrase.startIndex;
      } else {
        isKeepSearchingRetain = false;
      }
    }
    // add retain index or index of the first letter of the marked word
    markedWord.retain = cursorStartIndex;
    store.dispatch(getSimilarWordsRequest(markedWord));
  }
};

class MainApp {
  constructor(el) {
    this.el = el;
    this.store = store;
  }

  /**
   * 화면 정보 초기화
   */
  init(randerDiv, config) {
    if (process && process.env && process.env.NODE_ENV !== "production") {
      config.baseApiUrl = API_URL_BASE;
    }
    this.store.dispatch(setServerBaseApiUrl(config));

    ReactDOM.render(
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </React.Fragment>,
      document.getElementById(randerDiv)
    );
  }
}

export default MainApp;
