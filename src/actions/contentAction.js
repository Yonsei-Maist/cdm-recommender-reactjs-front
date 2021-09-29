/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @category Actions
 * @module actions/contentAction
 * @requires ../action-types/contentType
 */
import { createAction } from "redux-actions";
import CONTENT from "../action-types/contentType";

// Doc List
const setContent = createAction(CONTENT.SET_CONTENT);

export { setContent };
