<template>
  <div class="LoginTop">
<!--    <div>1{{ leftTitle }}</div>-->
<!--    <div>2{{ centerTitle }}</div>-->
<!--    <div>3{{ rightTitle }}</div>-->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "LoginTop",
  props: {
    leftTitle: '',
    centerTitle: '',
    rightTitle: ''
  }
}
</script>

<style lang="less">
.LoginTop {
  height: 50px;
  background-color: white;
  display: flex;


div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
}

}
</style>