<script setup>
import { reactive, watch } from 'vue'
import gsap from 'gsap'

// 从父组件接受要显示的结束值
const props = defineProps({
    endVal: {
        type: Number,
        default: 0
    }
})

const count = reactive({
    num: 0
})

function animateToEndVal() {
    gsap.to(count, {
        duration: 0.5, // unit: s
        num: props.endVal,
    })
}

animateToEndVal()

// 监听 endVal 变化，当 endVal 变化时，重新执行动画
watch(() => props.endVal, () => animateToEndVal())

</script>
<template>
    {{ count.num.toFixed(0) }}
</template>