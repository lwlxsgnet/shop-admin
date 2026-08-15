import request from "@/axios";

export function getImageById(id, page = 1) {
  return request.get(`/admin/image_class/${id}/image/${page}`);
}

export function renameImage(id, name) {
  return request.post(`/admin/image/${id}`, { name });
}

export function deleteImage(ids) {
  return request.post(`/admin/image/delete_all`, { ids });
}
