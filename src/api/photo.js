import request from "@/axios";

export function getImageById(id, page = 1) {
  return request.get(`/admin/${id}/image/${page}`);
}
