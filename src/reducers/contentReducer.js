/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import { handleActions } from "redux-actions";
import CONTENT from "../action-types/contentType";

/**
 * @type {Object}
 * @default
 * {
 *      arrWords: [],
 *      cntEmr: 0,
 *      cntCdm: 0,
 * }
 */
const defaultState = {
  arr_words: [],
  cnt_emr: 0,
  cnt_cdm: 0,
};

const contentReducer = handleActions(
  {
    [CONTENT.SET_CONTENT]: (state, action) => ({
      arr_words: action.payload.arr_words,
      cnt_emr: action.payload.cnt_emr,
      cnt_cdm: action.payload.cnt_cdm,
    }),
  },
  defaultState
);

export default contentReducer;
