import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * post method for login of user and to reset password
  @param {} API_URL
  @param {} Data
  @returns {Promise<void>} response with user data
 */

export const postLogin = async (API_URL, Data) => {
  try {
    const response = await axios.post(`${BASE_URL}${API_URL}`, Data, {
      headers: {
        "Content-Type": "application/json",
        "Access-control-Allow-Origin": "*",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * using get method of api  for fetching usa states list
 * @param {string} API_URL Token - url of api
 * @param {string} Token - token of user
 * @returns {Promise<void>} response with user data
 */

export const getMethodData = async (API_URL) => {  
  try {
    const response = await axios.get(`${BASE_URL}${API_URL}`);    
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * **POST**
 * method for getting users (customers and claimants) list
 * using get method of api  for fetching customer and claimants list
 * @param {string} API_URL Token - url of api
 * @param {string} data - data body for search filters if any else empty values for search all
 * @param {string} Token - token of user
 * @returns {Promise<void>} response with user data
 */

export const postMethodData = async (API_URL, data, config = {}) => {
  try {
    const headers = {
      ...config.headers,
    };
    // If data is FormData, do not set Content-Type to application/json
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const response = await axios.post(`${BASE_URL}${API_URL}`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 *
 * @param {*} API_URL
 * @param {*} data
 * @returns {Promise<void>} response with user data
 */

export const postMethodDataWithToken = async (API_URL, data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}${API_URL}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const patchMethodData = async (API_URL, data, Token) => {
  try {
    const response = await axios.patch(`${BASE_URL}${API_URL}`, data, {
      headers: { authorization: `Bearer ${Token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getSubmitData = async (API_URL, TokenGet) => {
  try {
    const response = await axios.get(`${BASE_URL}${API_URL}`, {
      headers: { authorization: `Bearer ${TokenGet}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMethod = async (API_URL, data, TokenGet) => {
  try {
    const response = await axios.put(`${BASE_URL}${API_URL}`, data, {
      headers: { authorization: `Bearer ${TokenGet}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const delMethod = async (API_URL, TokenGet, reason) => {
  try {
    const response = await axios.delete(`${BASE_URL}${API_URL}`, {
      headers: { authorization: `Bearer ${TokenGet}`, reason: reason },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
