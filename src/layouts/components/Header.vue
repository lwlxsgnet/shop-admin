<template>
    <div class="header">
        <span class="logo">
            <el-icon class="mr-1">
                <Shop />
            </el-icon>
            shop admin 
        </span>
        <el-icon class="icon-btn" @click="$store.commit('hideAsideWidth')">
            <Fold v-if="$store.state.asideWidth === '250px'" />
            <Expand v-else />
        </el-icon>
        <el-icon class="icon-btn" @click="handleRefresh">
            <el-tooltip effect="dark" content="刷新" placement="bottom">
                <Refresh />
            </el-tooltip>
        </el-icon>
        <div class="ml-auto flex items-center"> <!-- style="margin-left: auto;" -->
            <el-icon class="icon-btn" @click="toggle">
                <el-tooltip effect="dark" content="全屏" placement="bottom">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-tooltip>
            </el-icon>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" size="small">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input v-model="form.oldpassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="form.repassword" type="password" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { Fold, Refresh, FullScreen, ArrowDown, Shop, Aim, Expand } from '@element-plus/icons-vue'
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "@/components/FormDrawer.vue"
import { useRePassword, useLogout } from "@/composables/useManager"

const { isFullscreen, toggle } = useFullscreen()
const { form, rules, formRef, formDrawerRef, onSubmit, openRePasswordForm } = useRePassword();
const { handleLogout } = useLogout()

const handleCommand = (cmd) => {
    if (cmd === "changePwd") {
        // showDrawer.value = true
        openRePasswordForm()
    } else if (cmd === "logout") {
        handleLogout()
    }
}

const handleRefresh = () => location.reload()
</script>

<style scoped>
.header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex items-center justify-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center cursor-pointer;
    width: 42px;
    height: 64px;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.header .dropdown {
    height: 64px;
    @apply flex items-center justify-center cursor-pointer mx-5;
}
</style>