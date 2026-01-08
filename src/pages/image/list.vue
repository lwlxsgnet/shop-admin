<script setup>
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'

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
            <ImageAside />
            <ImageMain />
        </el-container>
    </el-container>
</template>
<style scoped>
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}
</style>