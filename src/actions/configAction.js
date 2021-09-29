/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2021.06.24
 */
import { createAction } from "redux-actions";
import CONFIG from "../action-types/configType";

const setServerBaseApiUrl = createAction(CONFIG.SET_SERVER_BASE_API_URL);

export { setServerBaseApiUrl };
