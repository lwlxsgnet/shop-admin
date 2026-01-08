<script setup>
import AsideList from '@/components/AsideList.vue'
import { getImageList } from "@/api/image";
import { ref, reactive } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";

// loading animation
const loading = ref(false);
const imageList = ref([]);
const activeId = ref(0);

function getData() {
    loading.value = true;
    getImageList(1).then(res => {
        imageList.value = res.list;
        let item = imageList.value[0];
        if (item) {
            activeId.value = item.id;
        }
    }).finally(() => {
        loading.value = false;
    })
}
getData();

const formDrawerRef = ref(null);
const open = () => formDrawerRef.value.open();

// 暴露 open 方法, 用于 list 组件调用
defineExpose({ open })

const form = reactive({
    name: '',
    order: 50
});

const rules = {
    name: [{ required: true, message: '请输入相册名称', trigger: 'blur' }],
};

const formRef = ref(null);
const handleSubmit = () => {
    formRef.value.validate(valid => {
        if (!valid) return;
    })
}
</script>

<template>
    <el-aside class="image-aside" width="220px" v-loading="loading">
        <div class="top">
            <AsideList :active="item.id === activeId" v-for="(item, index) in imageList" :key="index">
                {{ item.name }}
            </AsideList>
        </div>
        <div class="bottom">page</div>
    </el-aside>

    <FormDrawer ref="formDrawerRef" title="新增图片分类" @submit="handleSubmit">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="相册名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" min="0" max="1000" />
            </el-form-item>
        </el-form>
    </FormDrawer>
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
</style>