import request from "@/axios";

export function getImageList(page) {
  return request.get("/admin/image_class/" + page);
}

export function addImageList(data) {
  return request.post("/admin/image_class", data);
}

export function updateImageList(id, data) {
  return request.post("/admin/image_class/" + id, data);
}

export function deleteImageList(id) {
  return request.post(`/admin/image_class/${id}/delete`);
}
