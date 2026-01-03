import { router, addRoutes } from "@/router";
import { getToken } from "@/composables/auth";
import { toast, showLoading, hideLoading } from "@/composables/util";
import store from "@/store";

router.beforeEach(async (to, from, next) => {
  let hasNewRoutes = false;
  // 显示全局loading
  showLoading();
  const token = getToken();
  // to login page, check if token exists
  if (!token && to.path !== "/login") {
    toast("请先登录", "error");
    next({ path: "/login" });
  } else if (token && to.path === "/login") {
    toast("您已登录，无需重复登录", "warning");
    next({ path: from.path ? from.path : "/" });
  } else if (token) {
    // 如果登录了，获取用户信息存储到 vuex 中
    let { menus } = await store.dispatch("getInfo");
    // 动态添加路由
    hasNewRoutes = addRoutes(menus);
  }

  let title =
    (to.meta.title ? to.meta.title : "shop admin") + " - 商城管理后台";
  document.title = title;

  hasNewRoutes ? next(to.fullPath) : next();
});

// 全局后置守卫
router.afterEach(() => {
  // 隐藏全局loading
  hideLoading();
});
