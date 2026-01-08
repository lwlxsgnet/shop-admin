import request from "@/axios";

export function getImageList(page) {
  return request.get("/admin/image_class/" + page);
}
