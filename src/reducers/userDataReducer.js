/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.19
 */

/**
 * @category Reducers
 * @module reducers/userDataReducer
 * @requires '../action-types'
 */
import { USER_DATA } from "../action-types";

/**
 * @type {Object}
 * @default
 * {
 *  data: [],
 *  isLoading: false,
 *  error: '',
 * }
 */
const initialState = {
  data: [],
  isLoading: false,
  error: "",
  inputText: "",
};

/**
 * @function
 * @description reducer for userData state
 * @param {Object} state=initialState redux state
 * @param {Object} action redux action related to USER_DATA from '../action-types'
 */
const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA.LOAD_USER_DATA_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case USER_DATA.LOAD_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    }
    case USER_DATA.LOAD_USER_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default userDataReducer;
