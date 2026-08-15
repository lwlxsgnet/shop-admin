<script setup>
import { getImageById } from "@/api/photo";
import { ref } from "vue";

// 分页
const currentPage = ref(1);
const limit = ref(10);
const total = ref(0);

// 查询
const images = ref([]);
const loading = ref(false);
const image_class_id = ref(0);

function getData(page = null) {
    // 如果传入了页码，更新当前页码
    if (typeof page === 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    console.log(image_class_id.value);
    getImageById(image_class_id.value, currentPage.value).then(res => {
        total.value = res.totalCount;
        images.value = res.list;
    }).finally(() => {
        loading.value = false;
    })
}

// 根据分类 id 重新加载图片列表
const loadData = (id) => {
    currentPage.value = 1;
    image_class_id.value = id;
    getData();
}
// 将 loadData 传回父组件
defineExpose({ loadData })
</script>

<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
            <!-- <div v-for="(item, index) in images" :key="index">{{ item.url }}</div> -->
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) in images" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{ 'padding': 0 }">
                        <el-image :src="item.url" fit="cover" class="h-[150px]" style="width: 100%;"></el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">
                            <el-button type="primary" size="small" text>重命名</el-button>
                            <el-button type="primary" size="small" text>删除</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-main>
</template>
<style scoped>
.image-main {
    position: relative;
}

.image-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    @apply flex items-center justify-center;
}
.image-title {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>