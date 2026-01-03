import { createRouter, createWebHashHistory } from "vue-router";

// 默认路由，所有用户共享
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/admin.vue"),
    name: 'admin',
  },
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/404.vue"),
    name: '404',
  },
];

// 动态路由，用于匹配菜单动态添加路由
const dynamicRoutes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/pages/goods/list.vue"),
    meta: {
      title: "商品列表",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/pages/category/list.vue"),
    meta: {
      title: "分类列表",
    },
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新路由
  let hasNewRoutes = false;
  const findOrCreateRoutesByMenus = (arr) => {
    arr.forEach(e => {
      let item = dynamicRoutes.find(o => o.path === e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findOrCreateRoutesByMenus(e.child)
      }
    })
  }

  findOrCreateRoutesByMenus(menus)
  return hasNewRoutes
} 