/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @description DOC action types
 * @constant
 * @type {Object}
 * @property {string} GET_SIMILAR_WORDS_REQUEST get similar words request action type
 * @property {string} GET_SIMILAR_WORDS_SUCCESS get similar words success action type
 * @property {string} GET_SIMILAR_WORDS_ERROR get similar words error action type
 * @property {string} SET_CHANGE_EMR_WORD set change emr word action type
 * @property {string} SET_RESET_CHANGE_EMR_WORD set reset change emr word action type
 * @property {string} GET_EMR_CDM_RELATIONSHIP_REQUEST get Emr-Cdm Relationship request action type
 * @property {string} GET_EMR_CDM_RELATIONSHIP_SUCCESS get Emr-Cdm Relationship success action type
 * @property {string} GET_EMR_CDM_RELATIONSHIP_ERROR get Emr-Cdm Relationship error action type
 * @property {string} SET_PAGE_NUMBER_OF_EMR_WORD_LIST set page number of emr word list action type
 * @default {
 *      GET_SIMILAR_WORDS_REQUEST: 'GET_SIMILAR_WORDS_REQUEST',
 *      GET_SIMILAR_WORDS_SUCCESS: 'GET_SIMILAR_WORDS_SUCCESS',
 *      GET_SIMILAR_WORDS_ERROR: 'GET_SIMILAR_WORDS_ERROR',
 *
 *      SET_CHANGE_EMR_WORD: 'SET_CHANGE_EMR_WORD',
 *      SET_RESET_CHANGE_EMR_WORD: 'SET_RESET_CHANGE_EMR_WORD',
 *
 *      GET_EMR_CDM_RELATIONSHIP_REQUEST: 'GET_EMR_CDM_RELATIONSHIP_REQUEST',
 *      GET_EMR_CDM_RELATIONSHIP_SUCCESS: 'GET_EMR_CDM_RELATIONSHIP_SUCCESS',
 *      GET_EMR_CDM_RELATIONSHIP_ERROR: 'GET_EMR_CDM_RELATIONSHIP_ERROR',
 *      SET_PAGE_NUMBER_OF_EMR_WORD_LIST: 'SET_PAGE_NUMBER_OF_EMR_WORD_LIST',
 * }
 */
const WORD = {
  GET_SIMILAR_WORDS_REQUEST: "GET_SIMILAR_WORDS_REQUEST",
  GET_SIMILAR_WORDS_SUCCESS: "GET_SIMILAR_WORDS_SUCCESS",
  GET_SIMILAR_WORDS_ERROR: "GET_SIMILAR_WORDS_ERROR",

  SET_CHANGE_EMR_WORD: "SET_CHANGE_EMR_WORD",
  SET_RESET_CHANGE_EMR_WORD: "SET_RESET_CHANGE_EMR_WORD",

  GET_EMR_CDM_RELATIONSHIP_REQUEST: "GET_EMR_CDM_RELATIONSHIP_REQUEST",
  GET_EMR_CDM_RELATIONSHIP_SUCCESS: "GET_EMR_CDM_RELATIONSHIP_SUCCESS",
  GET_EMR_CDM_RELATIONSHIP_ERROR: "GET_EMR_CDM_RELATIONSHIP_ERROR",
  SET_PAGE_NUMBER_OF_EMR_WORD_LIST: "SET_PAGE_NUMBER_OF_EMR_WORD_LIST",

  SET_IS_ENABLE_WORD_ADD_MODE: "SET_IS_ENABLE_WORD_ADD_MODE",
  SET_SELECTED_EMR_WORD: "SET_SELECTED_EMR_WORD",
};

export default WORD;
