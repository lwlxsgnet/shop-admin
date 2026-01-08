<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

// 向父组件暴露事件
defineEmits(['edit', 'delete'])
</script>
<template>
    <div class="aside" :class="{ 'active': active }">
        <span class="truncate">
            <slot />
        </span>
        <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>
        <el-popconfirm title="确认删除吗？" confirmButtonText="确定" cancelButtonText="取消" @confirm="$emit('delete')">
            <template #reference>
                <el-button class="px-1" text type="primary" size="small">
                    <el-icon :size="12">
                        <Close />
                    </el-icon>
                </el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<style scoped>
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