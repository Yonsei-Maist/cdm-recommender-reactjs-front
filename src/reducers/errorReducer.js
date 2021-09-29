/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import ERROR from "../action-types/errorType";

/**
 * @type {Object}
 * @default
 * {
 *      error: null,
 *      isShow: false,
 * }
 */
const initState = {
  error: null,
  isShow: false,
};

/**
 * @function
 * @description reducer for error state, an unified error reducer that will listen to all error actions
 * @param {Object} state=initialState redux state
 * @param {Object} action redux action
 */
const errorReducer = (state = initState, action) => {
  const error = action && action.payload && action.payload.error;
  if (error) {
    return {
      error: error,
      isShow: true,
    };
  } else if (action.type === ERROR.HIDE_ERROR) {
    return {
      error: null,
      isShow: false,
    };
  }

  return state;
};

export default errorReducer;
