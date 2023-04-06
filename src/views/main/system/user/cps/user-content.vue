<script setup lang="ts">
import { useSystemStore } from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

//定义事件
const emit = defineEmits(['newUser', 'editClick'])

//发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(5)
fetchUserListData()

//获取userlist数据，进行展示
const { userList, userTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

//定义函数发送网络请求
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formData }
  systemStore.postUserListAction(queryInfo)
}

defineExpose({ fetchUserListData })

function handleDelete(id: number) {
  systemStore.deleteUserByIdAction(id)
}

function handleEdiBtnClick(itemdata: any) {
  emit('editClick', itemdata)
}

function handleNewUser() {
  emit('newUser')
}
</script>

<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUser">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="45px" />
        <el-table-column align="center" label="Idx" type="index" width="60px" />
        <el-table-column align="center" prop="name" label="User" width="120px" />
        <el-table-column align="center" prop="realname" label="Name" width="120px" />
        <el-table-column align="center" prop="cellphone" label="Phone" width="150px" />
        <el-table-column align="center" label="State" width="80px">
          <template v-slot="scope">
            {{ scope.row.enable ? 'on' : 'off' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="createTime">
          <template v-slot="scope">
            {{ formatUTC(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="updateTime">
          <template v-slot="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="action" width="180px">
          <template v-slot="scope">
            <el-button size="small" @click="handleEdiBtnClick(scope.row)">Edi</el-button>
            <el-button size="small" @click="handleDelete(scope.row.id)">Det</el-button>
          </template>
        </el-table-column>
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
        :total="userTotalCount"
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
