/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category API
 * @module api
 */

/**
 * @constant
 * @type {string}
 * @description API base address
 */
import { API_URL_USER_DATA } from "../constants";

class UsersService {
  /**
   * @method
   * @description fetch user data
   *
   * @returns {object} user data object
   */
  fetchUserData = async () => {
    const uri = API_URL_USER_DATA;
    const response = await fetch(uri, {
      method: "GET",
    });
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.errors);
    }

    return data;
  };
}

export default new UsersService();
