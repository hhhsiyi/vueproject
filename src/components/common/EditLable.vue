<template>
  <div class="btnName" @click="lableClick">
    <span>{{ left }}</span>
    <span><slot name="right"/> </span>
    <!--    <slot name="btnName"></slot>-->
  </div>
  <div class="test"></div>
</template>

<script>
export default {
  name: "EditLable",
  // props:['left','right']
  props: ['left'],
  emits: ['lableClick'],
  methods: {
    lableClick() {
      this.$emit('lableClick')
    }
  }
}
</script>

<style lang="less">
.btnName {
  background-color: white;
  color: #333;
  font-size: 4vw;
  padding: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.test {
  width: 100%;
  height: 1vw;
  background-color: #fff;
  background-image: linear-gradient(0deg, rgba(#ff6a00, .5) 50%, transparent 50%), linear-gradient(90deg, rgba(#ff6a00, .5) 50%, transparent 50%);
  background-size: 30px 30px;
  transform: skewX(35deg);
}
</style>