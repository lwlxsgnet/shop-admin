import request from "@/axios";

export function getStatistics1() {
  return request.get("/admin/statistics1");
}

export function getStatistics3(type) {
  return request.get(`/admin/statistics3?type=${type}`);
}

export function getStatistics2() {
  return request.get("/admin/statistics2");
}
