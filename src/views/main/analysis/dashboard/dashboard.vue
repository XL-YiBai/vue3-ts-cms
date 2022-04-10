<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <XlCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount"></PieEchart>
        </XlCard>
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
        <XlCard title="分类商品的销量"> </XlCard>
      </el-col>
      <el-col :span="12">
        <XlCard title="分类商品的收藏"></XlCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import XlCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    XlCard,
    PieEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        // 通过map转换为echart中接收数据的格式，name/value的对象
        return { name: item.name, value: item.goodsCount }
      })
    })

    return { categoryGoodsCount }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
