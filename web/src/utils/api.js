import axios from "axios";

let base = "api";

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.interceptors.request.use(
  function(response) {
    return response;
  },
  function(error) {
    //敏感接口.如果没有session跳转登录界面
    if (error.response.status == 403) {
      router.push({ name: "login" });
    }
  }
);

export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    inter
  });
};
export const uploadFileRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const putRequest = (url, params) => {
  return axios({
    method: "put",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
export const deleteRequest = url => {
  return axios({
    method: "delete",
    url: `${base}${url}`
  });
};
export const getRequest = (url, params) => {
  return axios({
    method: "get",
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    url: `${base}${url}`
  });
};
