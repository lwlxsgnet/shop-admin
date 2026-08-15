import request from '@/axios';

export function getNoticeList(page) {
  return request.get(`/admin/notice/${page}`);
}

export function addNotice(data) {
    return request.post("/admin/notice", data);
}

export function updateNotice(id, data) {
    return request.post("/admin/notice/" + id, data);
}

export function deleteNotice(id) {
  return request.post(`/admin/notice/${id}/delete`);
}

