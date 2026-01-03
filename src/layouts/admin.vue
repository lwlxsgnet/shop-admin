<script setup>
import Header from '@/layouts/components/Header.vue'
import Menu from '@/layouts/components/Menu.vue'
import TagList from '@/layouts/components/TagList.vue'
</script>

<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <Menu></Menu>
            </el-aside>
            <el-main>
                <TagList></TagList>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
    .el-aside{
        transition: all 0.2s;
    }
</style>