/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @description DOC action types
 * @constant
 * @type {Object}
 * @property {string} GET_DOC_LIST_REQUEST get doc list request action type
 * @property {string} GET_DOC_LIST_SUCCESS get doc list success action type
 * @property {string} GET_DOC_LIST_ERROR get doc list error action type
 * @property {string} GET_DOC_DETAILS_REQUEST get doc details request action type
 * @property {string} GET_DOC_DETAILS_SUCCESS get doc details success action type
 * @property {string} GET_DOC_DETAILS_ERROR get doc details error action type
 * @default {
 *      GET_DOC_LIST_REQUEST: 'GET_DOC_LIST_REQUEST',
 *      GET_DOC_LIST_SUCCESS: 'GET_DOC_LIST_SUCCESS',
 *      GET_DOC_LIST_ERROR: 'GET_DOC_LIST_ERROR',
 *      GET_DOC_DETAILS_REQUEST: 'GET_DOC_DETAILS_REQUEST',
 *      GET_DOC_DETAILS_SUCCESS: 'GET_DOC_DETAILS_SUCCESS',
 *      GET_DOC_DETAILS_ERROR: 'GET_DOC_DETAILS_ERROR',
 * }
 */
const DOC = {
  GET_DOC_LIST_REQUEST: "GET_DOC_LIST_REQUEST",
  GET_DOC_LIST_SUCCESS: "GET_DOC_LIST_SUCCESS",
  GET_DOC_LIST_ERROR: "GET_DOC_LIST_ERROR",
  GET_DOC_DETAILS_REQUEST: "GET_DOC_DETAILS_REQUEST",
  GET_DOC_DETAILS_SUCCESS: "GET_DOC_DETAILS_SUCCESS",
  GET_DOC_DETAILS_ERROR: "GET_DOC_DETAILS_ERROR",
  SAVE_DOC_REQUEST: "SAVE_DOC_REQUEST",
  SAVE_DOC_SUCCESS: "SAVE_DOC_SUCCESS",
  SAVE_DOC_ERROR: "SAVE_DOC_ERROR",
};

export default DOC;
