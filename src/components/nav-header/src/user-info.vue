<template>
  <div class="user-info">
    <div class="operation">
      <el-badge is-dot class="item">
        <el-tooltip content="消息" placement="bottom" effect="light">
          <el-icon class="icons"><chat-line-round /></el-icon>
        </el-tooltip>
      </el-badge>
      <el-tooltip content="权限" placement="bottom" effect="light">
        <el-icon class="icons"><collection-tag /></el-icon>
      </el-tooltip>
      <el-badge is-dot class="item">
        <el-tooltip content="通知" placement="bottom" effect="light">
          <el-icon class="icons"><message /></el-icon>
        </el-tooltip>
      </el-badge>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f504617a3a7e479c95020c1ec0826714~tplv-k3u1fbpfcp-no-mark:100:100:100:100.awebp?"
        />
        <span class="user-name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick"
            ><el-icon><circle-close-filled /></el-icon
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  CircleCloseFilled,
  ChatLineRound,
  CollectionTag,
  Message
} from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  components: { CircleCloseFilled, ChatLineRound, CollectionTag, Message },
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const router = useRouter()
    // 退出登录，删除token
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }

    return { name, handleExitClick }
  }
})
</script>

<style scoped lang="less">
.operation {
  display: inline-block;
  .item {
    margin: 0 12px;
  }
  .icons {
    cursor: pointer;
    font-size: 21px;
  }
  .icons:nth-child(2) {
    position: relative;
    top: 5px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .user-name {
    margin-left: 8px;
  }
}
</style>
