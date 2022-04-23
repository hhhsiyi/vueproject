<template>
  <div class="userInfo">
    <navbar/>
    <!--  顶栏-->
    <img src="@/assets/bg.jpg" class="backImg"/>
    <UserDetail :user-info="model"/>
  </div>

</template>

<script>
import Navbar from "@/components/common/Navbar";
import UserDetail from "@/components/userComponent/UserDetail";

export default {
  name: "Userinfo",
  components: {
    Navbar,
    UserDetail
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    getUserData() {
      const postParams = {
        'id':sessionStorage.getItem('userId')
      }
      this.$myHttp.post('api/queryUserById', postParams)
          .then((res)=>{
            // console.log('userInfo',res.data.data);
            this.model = res.data.data
            console.log(this.model)
          })
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style lang="less">
.userInfo {
  .backImg {
    width: 100%;
  }
}

</style>