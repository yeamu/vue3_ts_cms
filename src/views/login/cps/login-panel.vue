<script setup lang="ts">
import { ref, watch } from 'vue'
import PanePhone from './pane-phone.vue'
import PaneAccount from './pane-account.vue'
import { localCache } from '@/utils/cache'

const isRememberPassword = ref<boolean>(localCache.getCache('isRememberPassword') ?? false)
watch(isRememberPassword, (newValue) => {
  localCache.setCache('isRememberPassword', newValue)
})
const activeName = ref<string>('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>()

const handleLogin = () => {
  accountRef.value?.loginAction(isRememberPassword.value)
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 中间 -->
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
