<script setup>
/**
 * Menu 组件 - 侧边栏菜单渲染
 * 
 * 数据流：
 * 1. 用户登录后，路由守卫 (permission.js) 调用 store.dispatch("getInfo")
 * 2. API 请求获取菜单数据: POST /admin/getinfo
 * 3. 后端返回菜单数据，通过 commit("SET_MENUS", res.menus) 存入 Vuex
 * 4. store.state.menus 更新 → asideMenus computed 自动更新 → 组件重新渲染
 * 
 * 菜单数据结构示例：
 * [
 *   {
 *     name: "后台面板",
 *     icon: "Help",           // 图标组件名称（已在 main.js 全局注册）
 *     child: [
 *       {
 *         name: "主控台",
 *         frontpath: "/",     // 路由路径
 *         icon: "HomeFilled"
 *       }
 *     ]
 *   }
 * ]
 */

import { useRouter, useRoute } from 'vue-router'  // 路由导航和当前路由信息
import { computed, ref } from 'vue'                // 响应式数据
import { useStore } from 'vuex'                   // Vuex store 访问

const router = useRouter()   // 路由实例，用于编程式导航
const store = useStore()     // Vuex store 实例，获取全局状态
const route = useRoute()      // 当前路由信息

/**
 * 菜单项点击处理函数
 * @param {string} e - 菜单项的 index 值（即路由路径 frontpath）
 * 当用户点击菜单项时，Element Plus 的 el-menu 会触发 select 事件
 * 传递的参数是菜单项的 index 属性值
 */
const handleSelect = (e) => { 
  router.push(e)  // 导航到选中的路由路径
}

/**
 * 从 Vuex store 中获取菜单数据（响应式）
 * 使用 computed 确保当 store.state.menus 变化时，组件自动更新
 * 菜单数据在用户登录后通过 API 获取并存入 store
 */
const asideMenus = computed(() => store.state.menus)

/**
 * 计算侧边栏是否处于折叠状态
 * 当 asideWidth 为 "64px" 时，菜单折叠（只显示图标）
 * 当 asideWidth 为 "250px" 时，菜单展开（显示图标+文字）
 */
const isCollapse = computed(() => store.state.asideWidth === "64px")

/**
 * 当前激活的路由路径
 * 用于高亮显示当前页面对应的菜单项
 * el-menu 的 default-active 属性会根据此值高亮对应的菜单项
 */
const defaultActive = ref(route.path)
</script>

<template>
    <!-- 
        菜单容器
        :style 动态绑定宽度，响应 store.state.asideWidth 的变化
        宽度变化时会有 0.2s 的过渡动画（在 CSS 中定义）
    -->
    <div class="menu" :style="{ width: $store.state.asideWidth }">
        <!-- 
            Element Plus 菜单组件
            - unique-opened: 同时只能展开一个子菜单
            - :default-active: 当前激活的菜单项（根据路由路径高亮）
            - @select: 菜单项点击事件，触发 handleSelect 进行路由跳转
            - :collapse: 是否折叠（true 时只显示图标，false 时显示图标+文字）
            - :collapse-transition: 禁用折叠动画
        -->
        <el-menu 
            unique-opened
            :default-active="defaultActive" 
            class="border-0" 
            @select="handleSelect" 
            :collapse="isCollapse"
            :collapse-transition="false">
            
            <!-- 
                遍历菜单数组，渲染每个菜单项
                v-for 遍历 asideMenus（从 Vuex store 获取的菜单数据）
            -->
            <template v-for="(item, index) in asideMenus" :key="index">
                
                <!-- 
                    情况1: 有子菜单 → 渲染 el-sub-menu（可展开的父菜单）
                    v-if 判断：如果 item.child 存在且长度大于 0，则渲染子菜单
                    :index 用于标识菜单项，这里使用 item.name
                -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <!-- 
                        父菜单标题插槽
                        #title 是 Element Plus 的具名插槽，用于自定义父菜单标题内容
                    -->
                    <template #title>
                        <!-- 
                            图标渲染
                            <component :is="item.icon"> 是 Vue 的动态组件
                            item.icon 是字符串（如 "Help"），Vue 会根据名称查找已注册的组件
                            图标组件已在 main.js 中全局注册（ElementPlusIconsVue）
                        -->
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <!-- 菜单名称 -->
                        <span>{{ item.name }}</span>
                    </template>
                    
                    <!-- 
                        子菜单项循环渲染
                        v-for 遍历 item.child 数组，渲染每个子菜单项
                        :index 使用 item2.frontpath（路由路径），用于路由匹配和高亮
                    -->
                    <el-menu-item 
                        v-for="(item2, index2) in item.child" 
                        :key="index2" 
                        :index="item2.frontpath">
                        <!-- 子菜单项图标 -->
                        <el-icon>
                            <component :is="item2.icon" />
                        </el-icon>
                        <!-- 子菜单项名称 -->
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                
                <!-- 
                    情况2: 没有子菜单 → 直接渲染 el-menu-item（普通菜单项）
                    v-else 处理没有子菜单的情况
                    :index 使用 item.frontpath（路由路径）
                -->
                <el-menu-item v-else :index="item.frontpath">
                    <!-- 菜单项图标 -->
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <!-- 菜单项名称 -->
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style scoped>
/**
 * 菜单容器样式
 */
.menu {
    transition: all 0.2s;              /* 所有属性变化时的过渡动画（主要用于宽度变化） */
    top: 64px;                         /* 距离顶部 64px（Header 组件的高度） */
    left: 0;                           /* 贴左边 */
    bottom: 0px;                       /* 贴底部 */
    overflow-y: auto;                  /* 垂直方向内容溢出时可滚动 */
    overflow-x: hidden;                /* 水平方向隐藏溢出内容 */
    @apply shadow-md fixed bg-light-50; /* 
                                            WindiCSS 工具类：
                                            - shadow-md: 中等阴影
                                            - fixed: 固定定位（相对于视口）
                                            - bg-light-50: 浅色背景
                                         */
}
.menu::-webkit-scrollbar{
    width: 0px;
}
</style>