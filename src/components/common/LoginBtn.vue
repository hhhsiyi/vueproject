<template>
  <div class="loginbtn" @click="registerClick">
    <slot name="loginbtn"></slot>
  </div>
</template>

<script>
export default {
  name: "LoginBtn",
  methods:{
    registerClick(){
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
.loginbtn{
  margin-top: 10vw;
  margin-left: 5vw;
  margin-right: 5vw;
  height: 10vw;
  background-color: #ff5777;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22.5px;
  font-size: 4vw;
}

</style>