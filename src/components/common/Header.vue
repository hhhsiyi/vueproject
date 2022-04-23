<template>
  <!--  <div style="height: 5vh;line-height: 5vh;border-bottom: 1vh solid #42b983;background-color: #ccc;display: flex">-->
  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px;padding-left: 30px;font-weight: bold;color: deepskyblue">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 100px;margin: 0 auto">
      <DropDown/>
    </div>
  </div>

  <el-button>按钮</el-button>
</template>

<script>
import DropDown from '@/components/DropDown'
export default {
  name: "Header",
  components: {
    DropDown}
}
</script>

<style scoped>

</style>