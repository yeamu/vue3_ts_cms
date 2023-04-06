<script setup lang="ts">
import { reactive, defineExpose, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import { useLoginStore } from '@/stores/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9A-Z]{6,18}$/,
      message: '必须是6-18数组或字母组成',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9A-Z]{3,18}$/,
      message: '必须是3位以上数字或字母组成'
    }
  ]
}

const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction(isRememberPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRememberPassword) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, this is a error message.')
    }
  })
}
//暴露 定义在子组件上的属性和方法只能被直接引用该子组件的父组件所访问，而不能被该父组件的父组件所访问。
defineExpose({
  loginAction
})
</script>

<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped leng="less">
.pane-account {
}
</style>
