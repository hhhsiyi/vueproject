<template>
  <div class="userDetail">
    <div class="ziliao">
      <div class="txImg">
        <img :src="userInfo.txImg" v-if="userInfo.txImg">
        <img src="@/assets/tx.jpg" v-else>
      </div>
      <div class="userFans">
        <div class="f1">
          <p class="left">
            <span>0</span>
            <span>粉丝</span></p>
          <p class="center">
            <span>53</span>
            <span>关注</span></p>
          <p class="right">
            <span>0</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="f2">
          <div class="userEditBtn" @click="this.$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="userNameAndSignature">
      <h2 v-if="userInfo.name">
        {{ userInfo.name }}
      </h2>
      <h2 v-else>我没有名字</h2>
      <!--      <p>个性签名2</p>-->
    </div>
    <div class="userSignature">
      <p v-if="userInfo.desc">
        {{ userInfo.desc }}
      </p>
      <p v-else>这个人很懒</p></div>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  methods: {
    userInfoEnter() {
      console.log('进入页面');
      // localStorage.clear()
      console.log('id', sessionStorage.getItem('userId'))
      this.$myHttp.post('api/queryUserById', {'id': sessionStorage.getItem('userId')})
          .then(res => {
            console.log("响应报文", res);
          })
    }
  },
  props: ['userInfo'],
  // data() {
  //   return {
  //     userInfo: {
  //       txImg: '',
  //       name: '',
  //     }
  //   }
  // },
  created() {
    this.userInfoEnter()
  }
}
</script>

<style lang="less">
.userDetail {
  background-color: white;
  padding: 1vw 1vw;

  div:nth-child(2) {
    padding-bottom: 3vw;
    //display: flex;
  }

  > div {
    display: flex;
  }

  > div:nth-child(2) {
    display: flex;

    p {
      padding: 0 20vw;
    }
  }

  flex: 1;

  .txImg {
    img {
      //width: 85px;
      //height: 85px;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      padding: 1vw;
    }
  }

  .userFans {
    //display: flex;
    //align-items: center;
    //margin-top: 2vw;
    //margin-bottom: 2vw;
    //padding: 0;
    //margin-left: 20vw;
    margin: 1rem 10vw;
    //position: fixed;
    flex: 1;

    .f1 {
      display: flex;

      p {
        flex: 1;
        display: flex;
        //justify-content: center;
        //align-items: center;
        flex-direction: column;

        span:nth-child(2) {
          color: #cccccc;
        }
      }

      p:nth-child(1), p:nth-child(2) {
        border-right: 0.5vw solid #f4f4f4;
      }

    }

    .f2 {
      //margin-top: 2vw;
      padding-top: 1vw;
    }

    .userEditBtn {
      border: 0.3vw solid #ff5777;
      color: #ff8198;
      border-radius: 5%;
    }

    //.f1 {
    //  //flex: 1;
    //  display: flex;
    //  p {
    //    flex: 1;
    //  }
    //}

  }
}
</style>