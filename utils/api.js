import axios from "axios";

export const baseURL = "http://localhost:4000/api";
export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  timeoutErrorMessage: "Server not responding",
});

export const getRequest = async (url) => {
  try {
    const data = await api.get(url);
    if (data?.data) {
      return Promise.resolve(data?.data);
    } else {
      throw new Error("Failed get data list");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postRequest = async (url, data) => {
  try {
    const postData = await api.post(url, data);
    if (postData?.data?.status) {
      return Promise.resolve(postData?.data);
    } else {
      throw new Error("Failed to post data");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putRequest = async (url, data) => {
  try {
    const putData = await api.put(url, data);
    if (putData?.data?.status) {
      return Promise.resolve(putData?.data);
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteRequest = async (url) => {
  try {
    const deleteData = await api.delete(url);
    if (deleteData?.data?.status) {
      return Promise.resolve(deleteData?.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
