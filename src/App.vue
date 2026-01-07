<script setup></script>

<template>
  <router-view></router-view>
</template>


<style>
body {
  @apply bg-gray-100;
}

/* 全局loading样式 */
#nprogress .bar {
  background: #f4f4f4 !important;
  height: 3px !important;
}

/* 全局滚动条样式 */
/* ::-webkit-scrollbar {
  width: 0px;
} */
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-left-color: transparent;
  border-right-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
