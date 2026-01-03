import request from "@/axios";

export function login(username, password) {
  return request.post("/admin/login", {
    username,
    password,
  });
}

export function getInfo() {
  return request.post("/admin/getinfo");
}

export function logout() {
  return request.post("/admin/logout");
}

export function changePassword(data) {
  return request.post("/admin/updatepassword", data);
}
