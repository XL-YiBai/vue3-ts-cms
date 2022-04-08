<template>
  <div class="menu">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'main-menu',
  components: { PageContent },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
