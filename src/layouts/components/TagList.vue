<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

const cookie = useCookies()
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)
const tabList = ref([
    {
        title: '首页',
        path: '/',
    }
])
onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path
    addTab({
        title: to.meta.title,
        path: to.path,
    })
})
// 添加标签导航
const addTab = (tab) => {
    let noTab = tabList.value.findIndex(item => item.path === tab.path) === -1
    if (noTab) {
        tabList.value.push(tab)
    }
    cookie.set("tabList", tabList.value)
}
const removeTab = (targetName) => { }

const changeTab = (path) => {
    activeTab.value = path
    router.push(path)
}
</script>

<template>
    <div class="tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="flex-1" style="min-width: 100px;" @tab-remove="removeTab"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path !== '/'">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>close other</el-dropdown-item>
                        <el-dropdown-item>close all</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<style scoped>
.tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
}

.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}

:deep(.el-tabs__header) {
    @apply mb-0;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>