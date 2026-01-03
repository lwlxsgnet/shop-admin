import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";

export function toast(
  message,
  type = "success",
  dangerouslyUseHTMLString = false
) {
  ElNotification({
    message,
    type: type,
    dangerouslyUseHTMLString,
    duration: 1500,
  });
}

export function showModal(content = "", type = "warning", title = "") {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type,
  });
}

// 显示全局loading
export function showLoading() {
  nProgress.start();
}

// 隐藏全局loading
export function hideLoading() {
  nProgress.done();
}
