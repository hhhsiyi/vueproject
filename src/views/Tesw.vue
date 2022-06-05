<template>
  <button @click="add">加载更多</button>
  <div>{{ arr }}</div>
  <!--  <navbar/>-->
  <!--  <div>-->
  <!--    {{item.title}}-->
  <!--  </div>-->
</template>

<script>
import Navbar from "@/components/common/Navbar";

export default {
  name: "Tesw",
  components: {
    Navbar
  },
  data() {
    return {
      arr: []
    }
  },
  methods: {
    add() {
      this.arr.push(1)
    }
  }
  // props:"item"
}
</script>

<style scoped>

</style>