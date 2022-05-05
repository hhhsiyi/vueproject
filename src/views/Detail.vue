<template>
  <!--  <div >-->
  <div class="detailitem" @click="this.$router.push('api/detail/'+detailitem.itemid)">
    <div class="imageParent">
      <img :src="detailitem.image" style="width: 100%" v-if="detailitem.image">
      <img src="https://img0.baidu.com/it/u=2105137196,1697149427&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
           style="width: 100%" v-else>
      <span class="watchCount"><van-icon class="van-icon-play" name="play"/>121</span>
      <span class="commonCount"><van-icon class="van-icon-comment" name="search"/>20</span>
    </div>
    <p>
      {{ detailitem.title }}
    </p>
  </div>
  <!--  </div>-->

</template>

<script>
export default {
  name: "Detail",
  props: [
    'detailitem'
  ]
}
</script>

<style lang="less">
.detailitem {
  p {
    font-size: 4vw;
    //padding: 0vw 0vw;
    padding-bottom: 4vw;
  }
}

.imageParent {
  img {
    margin-bottom: 4vw;
  }

  position: relative;
  font-size: 1vw;
  color: #cccccc;

  .watchCount {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .commonCount {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>