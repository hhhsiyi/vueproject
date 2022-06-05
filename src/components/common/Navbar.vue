<template>
  <div class="navbar" @click="goToUserInfo()">
    <div class="logo">
      <van-icon
          size="10vw"
          name="home-o"
          alt="返回主页"
          @click="clickIndex()"/>
      <!--      <img src="@/assets/logo.png" alt="返回主页" @click="clickIndex()"/>-->
    </div>
    <div>
      <p>
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            input-align="center"
            @search="onSearch"/>
        <!--        <search v-model="searchValue"></search>-->
        <!--        <van-icon class="searchIcon" name="search"/>-->
      </p>
    </div>
    <div class="logo">
      <img src="@/assets/logo.png"/>
      <p v-if="userInfo">{{userInfo.name}}</p>
      <p v-else>他没名字</p>
    </div>
  </div>

</template>

<script>
import Search from "@/components/common/Search";

export default {
  name: "Navbar",
  components: {
    Search
  },
  data() {
    return {
      value: ''
    }
  },
  props: ['userInfo'],
  methods: {
    onSearch() {
      console.log(this.value);
    },
    clickIndex() {
      console.log("点击返回主页了");
      this.$router.push('/')
    },
    goToUserInfo(){
      // this.$router.push('/userInfo')
      console.log('进入详情');
    }
  }
}
</script>

<style lang="less">
.navbar {
  display: flex;
  height: 12.5vw;
  flex: 1;
  background-color: white;

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12.5vw;
  }

  div:nth-child(2) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      background-color: #f4f4f4;
      padding: 1vw 0;
      border-radius: 2vw;
      width: 90%;

      .searchIcon {
        justify-content: left;
      }
    }
  }

  div:nth-child(3) {
    //flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;

    img {
      width: 6vw;
      height: 6vw;
      margin-right: 1vw;
    }

    p {
      background-color: #ff5777;
      font-size: 4vw;
      border-radius: 1vw;
      color: white;
      //padding-left: 3vw;
      //padding-right: 3vw;
      padding: 2vw 3vw 2vw 3vw;
      //上右下左
      text-align: center;
      display: flex;
      margin: auto;
    }
  }
}
</style>