<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

//定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

//重置
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="user-search">
    <el-form label-width="120px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-form-item label="创建时间" prop="createAt">
                  <el-date-picker
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    v-model="searchForm[item.prop]"
                  /> </el-form-item
              ></template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <!-- 1.2.  -->
      <div class="btns">
        <el-button icon="RefreshLeft" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="Search" @click="handleQueryClick">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.user-search {
}
</style>
