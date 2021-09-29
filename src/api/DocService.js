/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

import AxiosApiInstance from "./AxiosApiInstance";
import {
  API_URL_GET_DOC_LIST,
  API_URL_GET_DOC_DETAILS,
  API_URL_SAVE_DOC,
} from "../constants";

class DocService {
  getDocList(userId) {
    return AxiosApiInstance.post(API_URL_GET_DOC_LIST, {
      userId,
    });
  }

  getDocDetails(docId) {
    return AxiosApiInstance.post(API_URL_GET_DOC_DETAILS, {
      id: docId,
    });
  }

  saveDoc({ userId, title, content }) {
    return AxiosApiInstance.post(API_URL_SAVE_DOC, {
      userId,
      title,
      content,
    });
  }
}

export default new DocService();
