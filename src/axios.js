import axios from "axios";
import { getToken } from "@/composables/auth";
import { toast } from "@/composables/util";
import store from "@/store";

const request = axios.create({
  baseURL: "/api",
});

// request interceptor
request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

// response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (err) => {
    const msg = err.response.data.msg || "请求失败";
    if (msg === "非法token，请先登录！") {
      store.dispatch("logout").finally(() => location.reload());
    }
    toast(msg, "error");
    return Promise.reject(err);
  }
);

export default request;
