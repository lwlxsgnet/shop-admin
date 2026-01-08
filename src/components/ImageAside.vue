<script setup>
import AsideList from '@/components/AsideList.vue'

</script>

<template>
    <el-aside class="image-aside" width="220px">
        <div class="top">
            <!-- 激活 -->
            <AsideList active>
                旅行图片
            </AsideList>
            <!-- 未激活 -->
            <AsideList>
                旅行图片
            </AsideList>
        </div>
        <div class="bottom">page</div>
    </el-aside>
</template>
<style scoped>
.image-aside {
    border-right: 1px solid #eeeeee;
    /* 用于滚动 */
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    @apply flex items-center justify-center;
}

.aside {
    cursor: pointer;
    border-bottom: 1px solid #f4f4f4;
    @apply flex items-center p-3 text-sm text-gray-600;
}

.aside:hover,
.active {
    @apply bg-blue-50;
}
</style>