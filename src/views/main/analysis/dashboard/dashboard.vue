<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <XlCard title="分类商品数量(饼图)"></XlCard>
      </el-col>
      <el-col :span="10">
        <XlCard title="不同城市商品销量"></XlCard>
      </el-col>
      <el-col :span="7">
        <XlCard title="分类商品数量(玫瑰图)"></XlCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <XlCard title="分类商品的销量">
          <BaseEchart :options="options"></BaseEchart>
        </XlCard>
      </el-col>
      <el-col :span="12">
        <XlCard title="分类商品的收藏"></XlCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import XlCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  name: 'dashboard',
  components: {
    XlCard,
    BaseEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }

    return { options }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
