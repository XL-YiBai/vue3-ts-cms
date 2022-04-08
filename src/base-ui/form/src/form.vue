<template>
  <!-- 该文件封装通用的form组件 -->
  <div class="xl-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  // 接收配置参数
  props: {
    // 该对象用于存取表单输入的数据
    modelValue: {
      type: Object,
      require: true
    },
    // 接收form表单各个item项的配置信息
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 控制每一项左侧文字的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 控制每个item项的样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    // 根据屏幕宽度，调节item占的份数，总共24份，从而响应式决定一行显示几个item
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    /* // 浅拷贝一份父组件使用v-model传递进来的formData
    const formData = ref({ ...props.modelValue })

    // 监听外界modelValue的变化，一旦点击了表单重置按钮，外面会重置，这里就监听到，然后也对formData做重置
    watch(
      () => props.modelValue,
      (newValue) => {
        formData.value = { ...newValue }
      }
    )

    // 深度监听自己组件formData的修改，然后emit通知父组件修改它的formData达到表单双向绑定的效果
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    ) */

    // 表单改变时触发，在函数里使用emit通知外界更新数据
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return { handleValueChange }
  }
})
</script>

<style scoped lang="less">
.xl-form {
  padding-top: 22px;
}
</style>
