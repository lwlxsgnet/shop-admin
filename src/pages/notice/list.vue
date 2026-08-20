<script setup>
import { ref, reactive, computed } from 'vue'
import { getNoticeList, deleteNotice, updateNotice, addNotice } from '@/api/notice';
import FormDrawer from '@/components/FormDrawer.vue';
import { toast } from "@/composables/util.js";

const tableData = ref([])
// loading animation
const loading = ref(false);
const formDrawerRef = ref(null); // 表单抽屉引用
const formRef = ref(null); // 表单引用


const defaultForm = {
    title: '',
    content: '',
}

const form = reactive({...defaultForm});

const rules = {
    title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
}

// 提交
const editId = ref(0)
const title = computed(() => editId.value ? '更新公告' : '新增公告');

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

function getData(page = null) {
    // 如果传入了页码，更新当前页码
    if (typeof page === 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    getNoticeList(currentPage.value).then(res => {
        tableData.value = res.list;
        total.value = res.totalCount;
    }).finally(() => {
        loading.value = false;
    })
}

getData()

// 删除公告
const handleDelete = (id) => {
    loading.value = true;
    deleteNotice(id).then(() => {
        toast('删除公告成功');
        getData();
    }).finally(() => {
        loading.value = false;
    })
}

function resetForm(row = null) {
    if (formRef.value) formRef.value.clearValidate();
    Object.assign(form, row || defaultForm);
}

// 新增
const handleCreate = () => {
    editId.value = 0;
    resetForm({
        title: '',
        content: '',
    });
    formDrawerRef.value.open();
}
// 编辑
const handleEdit = (row) => {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
}

// 提交
const handleSubmit = () => {
    formRef.value.validate(valid => {
        if (!valid) return;
        formDrawerRef.value.showLoading();
        const fun = editId.value ? updateNotice(editId.value, form) : addNotice(form);
        fun.then(() => {
            toast(editId.value ? '更新成功' : '新增成功');
            if (editId.value) { getData() } else { getData(1); }
            formDrawerRef.value.close();
            // 重置编辑ID，避免下次提交时误判
            editId.value = 0;
        }).finally(() => {
            formDrawerRef.value.hideLoading();
        })
    })
}

</script>


<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增 | 刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
            <el-tooltip content="刷新数据" placement="top" effect="dark">
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width: 100%;" v-loading="loading">
            <el-table-column label="公告标题" prop="title" />
            <el-table-column label="发布时间" prop="create_time" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="是否删除该公告？" confirmButtonText="确定" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <!-- 表单抽屉 -->
        <FormDrawer ref="formDrawerRef" :title="title" @submit="handleSubmit">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="请输入公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="请输入公告内容" type="textarea" :rows="5" />
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
