<script setup lang="ts"></script>

<template>
  <div class="pane-phone">
    <el-form label-width="60px">
      <el-form-item label="Phone">
        <el-input />
      </el-form-item>
      <el-form-item label="Code">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">Send</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped leng="less">
.pane-phone {
  color: red;
}

.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
