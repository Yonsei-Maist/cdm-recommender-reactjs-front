/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @category Actions
 * @module actions/docAction
 * @requires ../action-types/docType
 */
import { createAction } from "redux-actions";
import DOC from "../action-types/docType";

// Doc List
const getDocListRequest = createAction(DOC.GET_DOC_LIST_REQUEST);
const getDocListSuccess = createAction(DOC.GET_DOC_LIST_SUCCESS);
const getDocListError = createAction(DOC.GET_DOC_LIST_ERROR);
// Doc Details
const getDocDetailsRequest = createAction(DOC.GET_DOC_DETAILS_REQUEST);
const getDocDetailsSuccess = createAction(DOC.GET_DOC_DETAILS_SUCCESS);
const getDocDetailsError = createAction(DOC.GET_DOC_DETAILS_ERROR);
// Save Doc
const setSaveDocRequest = createAction(DOC.SAVE_DOC_REQUEST);
const setSaveDocSuccess = createAction(DOC.SAVE_DOC_SUCCESS);
const setSaveDocError = createAction(DOC.SAVE_DOC_ERROR);

export {
  getDocListRequest,
  getDocListSuccess,
  getDocListError,
  getDocDetailsRequest,
  getDocDetailsSuccess,
  getDocDetailsError,
  setSaveDocRequest,
  setSaveDocSuccess,
  setSaveDocError,
};
