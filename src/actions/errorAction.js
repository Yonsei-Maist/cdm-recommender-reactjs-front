/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @category Actions
 * @module actions/errorAction
 * @requires ../action-types/errorType
 */
import { createAction } from "redux-actions";
import ERROR from "../action-types/errorType";

// Doc List
const setError = createAction(ERROR.SET_ERROR);
const hideError = createAction(ERROR.HIDE_ERROR);

export { setError, hideError };
