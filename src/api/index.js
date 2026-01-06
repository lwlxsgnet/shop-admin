import request from "@/axios";

export function getStatistics1() {
  return request.get("/admin/statistics1");
}
