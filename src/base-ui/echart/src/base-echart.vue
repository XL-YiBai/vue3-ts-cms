<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
// 尝鲜，使用setup的新写法，直接在script中写setup内容
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

// 定义props
// defineProps定义props，套在withDefaults中可以设置默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value!)

  echartInstance.setOption(props.options)
})
</script>

<style scoped></style>
