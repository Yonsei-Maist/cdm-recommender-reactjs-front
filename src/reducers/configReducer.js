/**
 * set default setting used by application
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05. ~
 * @date 2020.10.23
 *
 *
 * refactoring
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @modified 2021.09.29
 */
import { handleActions } from "redux-actions";
import CONFIG from "../action-types/configType";
import { initBaseUrl } from "../api/AxiosApiInstance";

const defaultState = {
  baseApiUrl: null,
};

const configReducer = handleActions(
  {
    [CONFIG.SET_SERVER_BASE_API_URL]: (state, action) => {
      const { baseApiUrl } = action.payload;
      // Setting base api url to AxiosApiInstance
      initBaseUrl(baseApiUrl);

      return {
        ...state,
        baseApiUrl,
      };
    },
  },
  defaultState
);

export default configReducer;
