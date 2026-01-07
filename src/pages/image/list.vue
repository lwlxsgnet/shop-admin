<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight
const height = windowHeight - 64 - 44 - 40
</script>
<template>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
        <el-header class="image-header">
            <el-button type="primary">新增图片分类</el-button>
            <el-button type="warning">上传图片</el-button>
        </el-header>
        <el-container>
            <el-aside class="image-aside" width="220px">
                <div class="top">
                    <div v-for="i in 50" :key="i">{{ i }}</div>
                </div>
                <div class="bottom">page</div>
            </el-aside>
            <el-main class="image-main">
                <div class="top">
                    <div v-for="i in 50" :key="i">{{ i }}</div>
                </div>
                <div class="bottom">page</div>
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}

.image-aside {
    border-right: 1px solid #eeeeee;
    /* 用于滚动 */
    position: relative;
}

.image-main {
    position: relative;
}

.image-aside .top,
.image-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom,
.image-main .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    @apply flex items-center justify-center;
}
</style>