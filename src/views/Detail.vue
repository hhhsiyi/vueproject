<template>
  <!--  <div >-->
  <!--  <div @click="$router.push('api/article/{$}')">-->
  <div class="detailitem" @click="articleInfo(detailitem)">
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

  <!--  </div>-->

</template>

<script>
export default {
  name: "Detail",
  props: [
    'detailitem'
  ],
  methods: {
    articleInfo(detailitem) {
      console.log("debug", detailitem);
      // this.$router.push('/register')
      // this.$router.push('/article/'+detailitem.itemId)
      console.log("$route",this.$route);
      // console.log(typeof Number(this.$route.params.itemId));
      // console.log(typeof detailitem.itemId);
      // console.log(Number(this.$route.params.itemId) === detailitem.itemId)
      // if (Number(this.$route.params.itemId) === detailitem.itemId) {
        if (this.$route.path === '/article/' + detailitem.itemId) {
        console.log("重复点击!")
      } else {
        this.$router.push('/article/' + detailitem.itemId)
      }
      // +detailitem.itemId
    }
  }
}
</script>

<style lang="less">
.detailitem {
  p {
    font-size: 4vw;
    //padding: 0vw 0vw;
    padding-bottom: 4vw;
    //  单行省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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