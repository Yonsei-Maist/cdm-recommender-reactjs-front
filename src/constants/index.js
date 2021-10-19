/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.06
 */

/**
 * @category Constants
 * @module constants
 */

/**
 * @constant
 * @type {string=} http
 */
const SCHEME = "http";

/**
 * @constant
 * @type {string=} localhost
 */
const HOST = "maist.yonsei.ac.kr";

/**
 * @constant
 * @type {string=} 8080
 */
const PORT = "8899";

/**
 * @constant
 * @type {string=} ${SCHEME}://${HOST}:${PORT}
 */
export const API_URL_BASE =
  process.env.REACT_APP_DOCKER_COMPOSE === "true"
    ? "http://localhost:3050/api"
    : `${SCHEME}://${HOST}:${PORT}/`;

export const AXIOS_TIME_OUT = 0; //default is `0` (no timeout)

/* ------------------------------ UsersService ------------------------------ */
/**
 * @constant
 * @type {string=} ${API_BASE_ADDRESS}/user-data
 */
export const API_URL_USER_DATA = "user-data";

/* ------------------------------- DocService ------------------------------- */
export const API_URL_GET_DOC_LIST = "emr/doc/list";
export const API_URL_GET_DOC_DETAILS = "emr/doc/page";
export const API_URL_SAVE_DOC = "emr/doc";

/* ------------------------------- WordService ------------------------------ */
export const API_URL_GET_SEARCH_WORD = "cdm/words";
export const API_URL_GET_SIMILAR_WORDS = "cdm/similarity/words";
export const API_URL_GET_EMR_CDM_RELATIONSHIP = "cdm/words/list";

/**
 * @constant
 * @type {string=} handleOnClickMarkedWord
 */
export const METHOD_NAME_ONCLICK_MARKED_WORD = "handleOnClickMarkedWord";
