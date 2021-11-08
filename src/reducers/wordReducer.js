/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import { handleActions } from "redux-actions";
import WORD from "../action-types/wordType";

/**
 * @type {Object}
 * @default
 * {
 *      similarWords: {
 *          data: [],
 *          isLoading: false,
 *          error: '',
 *      },
 * }
 */
const defaultState = {
  similarWords: {
    data: {},
    isLoading: false,
    error: "",
  },
  changeEmrWord: {},
  resetChangeEmrWord: {},
  emrCdmRelationship: {},
  pageNumberOfEmrWordList: 1,
  isEnableWordAddMode: false,
  selectedEmrWord: null,
};

const wordReducer = handleActions(
  {
    // Get similar words List
    [WORD.GET_SIMILAR_WORDS_REQUEST]: (state, action) => ({
      ...state,
      similarWords: {
        ...state.similarWords,
        isLoading: true,
        error: "",
      },
    }),
    [WORD.GET_SIMILAR_WORDS_SUCCESS]: (state, action) => ({
      ...state,
      similarWords: {
        ...state.similarWords,
        data: action.payload,
        isLoading: false,
        error: "",
      },
    }),
    [WORD.GET_SIMILAR_WORDS_ERROR]: (state, action) => ({
      ...state,
      similarWords: {
        ...state.similarWords,
        isLoading: false,
        error: action.payload.error,
      },
    }),
    [WORD.SET_CHANGE_EMR_WORD]: (state, action) => ({
      ...state,
      changeEmrWord: action.payload,
    }),
    [WORD.SET_RESET_CHANGE_EMR_WORD]: (state, action) => ({
      ...state,
      resetChangeEmrWord: action.payload,
    }),
    // Get Emr-Cdm Relationship List
    [WORD.GET_EMR_CDM_RELATIONSHIP_REQUEST]: (state, action) => ({
      ...state,
      emrCdmRelationship: {
        ...state.emrCdmRelationship,
        isLoading: true,
        error: "",
      },
    }),
    [WORD.GET_EMR_CDM_RELATIONSHIP_SUCCESS]: (state, action) => ({
      ...state,
      emrCdmRelationship: {
        ...state.emrCdmRelationship,
        data: action.payload,
        isLoading: false,
      },
    }),
    [WORD.GET_EMR_CDM_RELATIONSHIP_ERROR]: (state, action) => ({
      ...state,
      emrCdmRelationship: {
        ...state.emrCdmRelationship,
        isLoading: false,
        error: action.payload.error,
      },
    }),
    // Set page number of emr word list
    [WORD.SET_PAGE_NUMBER_OF_EMR_WORD_LIST]: (state, action) => ({
      ...state,
      pageNumberOfEmrWordList: action.payload,
    }),
    // Set isEnableWordAddMode
    [WORD.SET_IS_ENABLE_WORD_ADD_MODE]: (state, action) => ({
      ...state,
      isEnableWordAddMode: action.payload,
    }),
    // Set selectedEmrWord
    [WORD.SET_SELECTED_EMR_WORD]: (state, action) => ({
      ...state,
      selectedEmrWord: action.payload,
    }),
  },
  defaultState
);

export default wordReducer;
