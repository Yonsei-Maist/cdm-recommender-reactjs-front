/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Action Type
 * @module action-types
 */

/**
 * @description USER_DATA action types
 * @constant
 * @type {Object}
 * @property {string} LOAD_USER_DATA_LOADING load user data loading action type
 * @property {string} LOAD_USER_DATA_SUCCESS load user data success action type
 * @property {string} LOAD_USER_DATA_ERROR load user data error action type
 * @default {
 *      LOAD_USER_DATA_LOADING: 'LOAD_USER_DATA_LOADING',
 *      LOAD_USER_DATA_SUCCESS: 'LOAD_USER_DATA_SUCCESS',
 *      LOAD_USER_DATA_ERROR: 'LOAD_USER_DATA_ERROR',
 * }
 */
const USER_DATA = {
  LOAD_USER_DATA_LOADING: "LOAD_USER_DATA_LOADING",
  LOAD_USER_DATA_SUCCESS: "LOAD_USER_DATA_SUCCESS",
  LOAD_USER_DATA_ERROR: "LOAD_USER_DATA_ERROR",
};

export { USER_DATA };
