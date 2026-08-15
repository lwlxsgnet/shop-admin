import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";

// 消息提示
export function toast(
  message,
  type = "success",
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type: type,
    dangerouslyUseHTMLString,
    duration: 1500,
  });
}

// 弹窗确认
export function showModal(content = "", type = "warning", title = "") {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type,
  });
}

// 弹出输入框
export function showPrompt(tip, value = "") {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value,
  })
}

// 显示全局loading
export function showLoading() {
  nProgress.start();
}

// 隐藏全局loading
export function hideLoading() {
  nProgress.done();
}
