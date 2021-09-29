/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

import AxiosApiInstance from "./AxiosApiInstance";
import {
  API_URL_GET_SEARCH_WORD,
  API_URL_GET_SIMILAR_WORDS,
  API_URL_GET_EMR_CDM_RELATIONSHIP,
} from "../constants";

class WordService {
  // getSearchWord to verify if word is emr word
  getSearchWord(word, timeout = 0) {
    return AxiosApiInstance.post(
      API_URL_GET_SEARCH_WORD,
      { word },
      { timeout }
    );
  }

  // default is `0` (no timeout)
  getSimilarWords(id, timeout = 0) {
    return AxiosApiInstance.post(
      API_URL_GET_SIMILAR_WORDS,
      { id },
      { timeout }
    );
  }

  getEmrCdmRelationship(currentPageNo) {
    return AxiosApiInstance.post(API_URL_GET_EMR_CDM_RELATIONSHIP, {
      currentPageNo,
    });
  }
}

export default new WordService();
