<script setup lang="ts">
import { useSystemStore } from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}
defineProps<IProps>()
//定义事件
const emit = defineEmits(['newClick', 'editClick'])

//发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(5)
fetchPageListData()

//获取userlist数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

//定义函数发送网络请求
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

defineExpose({ fetchPageListData })

function handleDelete(id: number) {
  systemStore.deletePageByIdAction('department', id)
}

function handleEdiBtnClick(itemdata: any) {
  emit('editClick', itemdata)
}

function handleNewUser() {
  emit('newClick')
}
</script>

<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUser">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" label="createTime">
              <template v-slot="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column></template
          >
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template v-slot="scope">
                <el-button size="small" @click="handleEdiBtnClick(scope.row)">Edi</el-button>
                <el-button size="small" @click="handleDelete(scope.row.id)">Det</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope"
                ><slot :name="item.slotName" v-bind="scope"></slot
              ></template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="false"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    :deep(.el-table__cell) {
      // padding: 14px 0;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
