/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @category Actions
 * @module actions/wordAction
 * @requires ../action-types/docType
 */
import { createAction } from "redux-actions";
import WORD from "../action-types/wordType";

// Get similar words List
const getSimilarWordsRequest = createAction(WORD.GET_SIMILAR_WORDS_REQUEST);
const getSimilarWordsSuccess = createAction(WORD.GET_SIMILAR_WORDS_SUCCESS);
const getSimilarWordsError = createAction(WORD.GET_SIMILAR_WORDS_ERROR);

const setChangeEmrWord = createAction(WORD.SET_CHANGE_EMR_WORD);
const setResetChangeEmrWord = createAction(WORD.SET_RESET_CHANGE_EMR_WORD);

// Get Emr-Cdm Relationship List
const getEmrCdmRelationshipRequest = createAction(
  WORD.GET_EMR_CDM_RELATIONSHIP_REQUEST
);
const getEmrCdmRelationshipSuccess = createAction(
  WORD.GET_EMR_CDM_RELATIONSHIP_SUCCESS
);
const getEmrCdmRelationshipError = createAction(
  WORD.GET_EMR_CDM_RELATIONSHIP_ERROR
);
const setPageNumberOfEmrWordList = createAction(
  WORD.SET_PAGE_NUMBER_OF_EMR_WORD_LIST
);

export {
  getSimilarWordsRequest,
  getSimilarWordsSuccess,
  getSimilarWordsError,
  setChangeEmrWord,
  setResetChangeEmrWord,
  getEmrCdmRelationshipRequest,
  getEmrCdmRelationshipSuccess,
  getEmrCdmRelationshipError,
  setPageNumberOfEmrWordList,
};
