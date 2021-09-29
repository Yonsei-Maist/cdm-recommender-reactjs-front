/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.19
 */

/**
 * @category Sagas
 * @module sagas/userDataSaga
 * @requires '../action-types'
 * @requires '../api'
 * @requires '../actions/userDataAction'
 */

import { put, call, takeLatest } from "redux-saga/effects";
import { USER_DATA } from "../action-types";
import UserService from "../api/UserService";
import {
  setLoadUserDataSuccess,
  setLoadUserDataError,
} from "../actions/userDataAction";

/**
 * @generator
 * @function
 * @description handle saga of load user data
 * @param {action} action redux action
 *
 * @yields {Object} CallEffect of fetchUserData api
 * @yields {Object} PutEffect of setLoadUserDataSuccess action
 * @yields {Object} PutEffect of setLoadUserDataError action
 */
function* handleLoardUserData() {
  try {
    const loadData = yield call(UserService.fetchUserData);
    yield put(setLoadUserDataSuccess(loadData));
  } catch (error) {
    yield put(setLoadUserDataError(error.toString()));
  }
}

/**
 * @generator
 * @function
 * @description watch saga of load user data
 *
 * @yields {Object} ForkEffect of handleLoardUserData saga
 */
export default function* watchLordUserData() {
  // Does not allow concurrent fetches of data
  yield takeLatest(USER_DATA.LOAD_USER_DATA_LOADING, handleLoardUserData);
}
