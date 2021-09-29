/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Store
 * @module store
 * @requires redux
 * @requires redux-saga
 * @requires '../sagas'
 * @requires '../reducers'
 */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";

import rootReducer from "../reducers";

/**
 * @method
 * @description configure redux store
 * @param {Function} createSagaMiddleware method for creating saga middleware
 * @param {Function} createStore method for creating redux store
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
