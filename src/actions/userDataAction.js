/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.19
 */

/**
 * @category Actions
 * @module actions/userDataAction
 * @requires ../action-types
 */
import { USER_DATA } from "../action-types";

/**
 * @method
 * @description load user data loading action
 *
 * @returns {object} {type: USER_DATA.LOAD_USER_DATA_LOADING}
 */
const loadUserData = () => ({
  type: USER_DATA.LOAD_USER_DATA_LOADING,
});

/**
 * @method
 * @description set load user data success action
 *
 * @returns {object} {type: USER_DATA.LOAD_USER_DATA_SUCCESS, data}
 */
const setLoadUserDataSuccess = (data) => ({
  type: USER_DATA.LOAD_USER_DATA_SUCCESS,
  data,
});

/**
 * @method
 * @description set load user data error action
 *
 * @returns {Object} {type: USER_DATA.LOAD_USER_DATA_ERROR, error}
 */
const setLoadUserDataError = (error) => ({
  type: USER_DATA.LOAD_USER_DATA_ERROR,
  error,
});

export { loadUserData, setLoadUserDataSuccess, setLoadUserDataError };
