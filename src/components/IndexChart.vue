<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { getStatistics3 } from "@/api"
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core'

const current = ref("week")

const options = [
    {
        text: "近1月",
        value: "month",
    },
    {
        text: "近1周",
        value: "week",
    },
    {
        text: "近24小时",
        value: "hour",
    },
]

const handleChoose = (type) => {
    current.value = type
    getChartData()
}

var myChart = null;
onMounted(() => {
    var chartDom = document.getElementById('chart');
    myChart = echarts.init(chartDom);
    getChartData()
})

onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart);
})

function getChartData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar'
            }
        ]
    };

    myChart.showLoading();
    getStatistics3(current.value).then(res => {
        option.xAxis.data = res.x;
        option.series[0].data = res.y;
        myChart.setOption(option);
    }).finally(() => {
        myChart.hideLoading();
    })
}

// 图表宽度自适应
const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="item.value === current"
                        style="margin-right: 8px" @click="handleChoose(item.value)">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="width: 100%; height: 300px;"></div>
    </el-card>
</template>