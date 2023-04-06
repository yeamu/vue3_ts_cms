<script setup lang="ts">
import loginPanel from './cps/login-panel.vue'
</script>

<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background: url('@/assets/img/login-bg.svg');
}
</style>
