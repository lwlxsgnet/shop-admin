import request from "@/axios";

export function getImageById(id, page = 1) {
  return request.get(`/admin/image_class/${id}/image/${page}`);
}
