<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <fold v-show="!isFold" />
      <expand v-show="isFold" />
    </el-icon>
    <el-icon>
      <chat-line-square />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
  components: { Fold, Expand },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // isFold控制左侧菜单是否折叠
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
