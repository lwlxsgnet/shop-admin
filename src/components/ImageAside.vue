<script setup>
import AsideList from '@/components/AsideList.vue'
import { getImageList, addImageList, updateImageList, deleteImageList } from "@/api/image";
import { ref, reactive, computed } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { toast } from "@/composables/util.js";

// loading animation
const loading = ref(false);
const imageList = ref([]);
const activeId = ref(0);
const formDrawerRef = ref(null);
const formRef = ref(null);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 提交
const editId = ref(0)
const title = computed(() => editId.value ? '更新相册' : '新增相册');

const form = reactive({
    name: '',
    order: 50
});
const rules = {
    name: [{ required: true, message: '请输入相册名称', trigger: 'blur' }],
};

function getData(page = null) {
    // 如果传入了页码，更新当前页码
    if (typeof page === 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    getImageList(currentPage.value).then(res => {
        total.value = res.totalCount;
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

const handleSubmit = () => {
    formRef.value.validate(valid => {
        if (!valid) return;
        formDrawerRef.value.showLoading();
        const isEdit = !!editId.value;
        const fun = isEdit ? updateImageList(editId.value, form) : addImageList(form);
        fun.then(() => {
            toast(isEdit ? '更新成功' : '新增成功');
            if (isEdit) { getData() } else { getData(1); }
            formDrawerRef.value.close();
            // 重置编辑ID，避免下次提交时误判
            editId.value = 0;
        }).finally(() => {
            formDrawerRef.value.hideLoading();
        })
    })
}

const openDrawer = () => {
    editId.value = 0;
    // 新增时, 清空表单数据
    form.name = '';
    form.order = 50;
    formDrawerRef.value.open();
}
// 暴露 open 方法, 用于 list 组件调用
defineExpose({ openDrawer });

// 处理 AsideList 组件的事件
const handleEdit = (row) => {
    editId.value = row.id;
    form.name = row.name;
    form.order = row.order;
    formDrawerRef.value.open();
}

const handleDelete = (id) => {
    loading.value = true;
    deleteImageList(id).then(() => {
        toast('删除成功');
        getData();
    }).finally(() => {
        loading.value = false;
    })
}
</script>

<template>
    <el-aside class="image-aside" width="220px" v-loading="loading">
        <div class="top">
            <AsideList :active="item.id === activeId" v-for="(item, index) in imageList" :key="index"
                @edit="handleEdit(item)" @delete="handleDelete(item.id)">
                {{ item.name }}
            </AsideList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" v-model:current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-aside>

    <FormDrawer ref="formDrawerRef" :title="title" @submit="handleSubmit">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="相册名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
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