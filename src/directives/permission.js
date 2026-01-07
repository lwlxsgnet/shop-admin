import store from "@/store";

function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限, 如 v-permission="['getStatistics3,GET']"`);
  }
  // 检查是否有任意一个权限匹配
  const hasAuth =
    value.findIndex((v) => store.state.ruleNames.includes(v)) !== -1;
  // 如果没有权限, 且有节点, 则移除节点
  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el);
  }
  return hasAuth;
}

export default {
  install(app) {
    app.directive("permission", {
      // el: v-permission 节点 binding: v-permission 的 数组值
      mounted(el, binding) {
        hasPermission(binding.value, el);
      },
    });
  },
};
