# 商城后台管理系统

基于 **Vue 3 + Vite + Element Plus** 构建的现代化商城后台管理系统，提供商品管理、订单管理、用户管理、权限控制等核心功能。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 构建工具 | Vite 7 |
| UI 组件库 | Element Plus |
| 状态管理 | Vuex 4 |
| 路由 | Vue Router 4 |
| HTTP 请求 | Axios |
| 图表 | ECharts 6 |
| CSS 框架 | WindiCSS |
| 动画 | GSAP |
| 进度条 | NProgress |
| Cookie | universal-cookie / @vueuse/integrations |
| 图标 | @element-plus/icons-vue |

## 功能模块

- **仪表盘** - 数据统计概览，可视化图表展示
- **商品管理** - 商品列表的增删改查
- **分类管理** - 商品分类的维护
- **订单管理** - 订单列表查看与管理
- **用户管理** - 平台用户的管理
- **优惠券管理** - 优惠券的创建与维护
- **评价管理** - 用户评价的审核与管理
- **公告管理** - 系统公告的发布与维护
- **图库管理** - 图片资源的上传、分类与管理
- **系统设置** - 基础配置项管理
- **权限控制** - 基于角色的动态路由与按钮级权限
- **登录认证** - Token 认证、修改密码、退出登录

## 项目结构

```
shop-admin/
├── public/                  # 静态资源
├── src/
│   ├── api/                 # API 接口层
│   │   ├── index.js         # 统计相关接口
│   │   ├── manager.js       # 管理员登录/信息接口
│   │   ├── image.js         # 图库分类接口
│   │   └── photo.js         # 图片资源接口
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件
│   │   ├── AsideList.vue    # 侧边栏菜单列表
│   │   ├── CountTo.vue      # 数字滚动动画组件
│   │   ├── FormDrawer.vue   # 抽屉表单组件
│   │   ├── ImageAside.vue   # 图库分类侧边栏
│   │   ├── ImageMain.vue    # 图库主内容区
│   │   ├── IndexCard.vue    # 首页统计卡片
│   │   ├── IndexChart.vue   # 首页图表
│   │   ├── IndexNav.vue     # 首页快捷导航
│   │   └── UploadFile.vue   # 文件上传组件
│   ├── composables/         # 组合式函数
│   │   ├── auth.js          # Token 认证管理
│   │   ├── util.js          # 通用工具函数
│   │   ├── useManager.js    # 管理员相关逻辑
│   │   └── useTagList.js    # 标签导航逻辑
│   ├── directives/          # 自定义指令
│   │   └── permission.js    # 权限指令 v-permission
│   ├── layouts/             # 布局组件
│   │   ├── admin.vue        # 主布局（Header + Sidebar + Main）
│   │   └── components/      # 布局子组件
│   │       ├── Header.vue   # 顶部导航栏
│   │       ├── Menu.vue     # 侧边栏菜单
│   │       └── TagList.vue  # 标签页导航
│   ├── pages/               # 页面组件
│   │   ├── index.vue        # 首页/仪表盘
│   │   ├── login.vue        # 登录页
│   │   ├── 404.vue          # 404 页面
│   │   ├── about.vue        # 关于页
│   │   ├── goods/           # 商品管理
│   │   ├── category/        # 分类管理
│   │   ├── order/           # 订单管理
│   │   ├── user/            # 用户管理
│   │   ├── coupon/          # 优惠券管理
│   │   ├── comment/         # 评价管理
│   │   ├── notice/          # 公告管理
│   │   ├── image/           # 图库管理
│   │   └── setting/         # 系统设置
│   ├── router/              # 路由配置
│   │   └── index.js         # 静态路由 + 动态路由
│   ├── store/               # Vuex 状态管理
│   │   └── index.js
│   ├── App.vue              # 根组件
│   ├── axios.js             # Axios 封装（拦截器、统一错误处理）
│   ├── main.js              # 应用入口
│   └── permission.js        # 路由守卫（权限控制）
├── index.html               # HTML 入口
├── vite.config.js           # Vite 配置
└── package.json             # 项目依赖
```

## 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9（推荐使用 npm）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 `http://localhost:5173` 即可查看。

### 构建生产环境

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览构建结果

```bash
npm run preview
```

## 开发指南

### API 代理配置

开发环境下，API 请求通过 Vite 代理转发到后端服务。代理配置在 [vite.config.js](vite.config.js) 中：

```js
server: {
  proxy: {
    '/api': {
      target: 'http://ceshi13.dishait.cn',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    }
  }
}
```

所有以 `/api` 开头的请求会被代理到目标服务器，且路径中的 `/api` 前缀会被移除。

### 权限控制

系统通过后端返回的菜单和权限规则实现动态权限控制：

- **路由级权限**：登录后根据后端返回的 `menus` 动态添加路由，用户只能访问有权限的页面
- **按钮级权限**：使用 `v-permission` 指令控制元素的显示，如 `v-permission="['getStatistics3,GET']"`

### Token 认证

Token 存储在 Cookie 中，通过 Axios 请求拦截器自动附加到请求头：

```js
config.headers["token"] = token;
```

当 Token 失效时，系统会自动退出登录并重新加载页面。

### 路由守卫

在 [permission.js](src/permission.js) 中定义了全局路由守卫：

- 未登录用户访问非登录页 → 跳转至登录页
- 已登录用户访问登录页 → 重定向到首页
- 已登录用户首次访问 → 获取用户信息和动态路由

## 核心依赖说明

| 依赖 | 用途 |
|------|------|
| `vue` | 核心框架，使用 Composition API |
| `element-plus` | UI 组件库，提供表格、表单、弹窗等组件 |
| `vue-router` | 路由管理，支持静态路由 + 动态路由 |
| `vuex` | 状态管理，存储用户信息、菜单、权限等 |
| `axios` | HTTP 请求，封装了拦截器和统一错误处理 |
| `echarts` | 数据可视化图表 |
| `windicss` | 原子化 CSS 框架 |
| `gsap` | 高性能动画库 |
| `nprogress` | 页面加载进度条 |
| `@vueuse/integrations` | VueUse 集成，用于 Cookie 操作 |
| `@element-plus/icons-vue` | Element Plus 图标库 |