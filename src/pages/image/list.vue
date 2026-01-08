<script setup>
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'
import { ref } from 'vue'

const windowHeight = window.innerHeight || document.body.clientHeight;
const height = windowHeight - 64 - 44 - 40;

// 点击新增图片分类按钮, 打开新增图片分类抽屉
const imageAsideRef = ref(null);
const handleOpen = () => imageAsideRef.value.open();
</script>
<template>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpen">新增图片分类</el-button>
            <el-button type="warning" size="small">上传图片</el-button>
        </el-header>
        <el-container>
            <ImageAside ref="imageAsideRef" />
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