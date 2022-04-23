<template>
  <el-dropdown>
    <el-button type="primary">
      张三信息<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped>

</style>
