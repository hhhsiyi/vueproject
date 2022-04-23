<template>
  <div>
    <h2>登陆页面</h2>
    <login-top>
      <!--      <template slot="right">退出</template>-->
      <template v-slot:center>登陆</template>
      <!--    <template v-slot:left>后退</template>-->
      <template v-slot:right>
        <div @click="this.$router.push('/register')">
          切换注册界面
        </div>
      </template>
    </login-top>

    <!--  <login-text-->
    <!--      label="姓名"-->
    <!--      style="margin: 4vw 0"-->
    <!--      placeholder="请输入姓名"-->
    <!--      :rule="commonRule"-->
    <!--      @passVerification="res => (account.name=res)"-->
    <!--  ></login-text>-->
    <login-text label="账号" placeholder="请输入账号" :rule="commonRule"
                @passVerification="res => (account.accountName=res)"
                style="margin: 4vw 0"></login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" :rule="commonRule"
                @passVerification="res => (account.password=res)"></login-text>
    <login-btn @btnClick="signInClick">
      <template v-slot:loginbtn>登陆</template>
    </login-btn>

    <login-btn @click="getAllSignUpUser">
      <template v-slot:loginbtn>查询已有用户</template>
    </login-btn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";
import {requestPost2} from "@/network";

export default {
  name: "Login",
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  data() {
    return {
      account: {
        accountName: '',
        password: ''
      },
      commonRule: '^.{6,16}$',
      registerUser: []
    }
  },
  methods: {
    signInClick() {
      //  点击登陆
      const postValue = {
        'accountName': this.account.accountName,
        'password': this.account.password
      }
      // requestPost2('api/signIn',postValue)
      //     .then(res => {
      //       if (res.data.code === 0) {
      //         this.$alert.success(res.data.message)
      //       } else {
      //         this.$alert.fail(res.data.message)
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
      this.$myHttp.post('api/signIn', postValue)
          .then(res => {
            if (res.data.code === 0) {
              this.$alert.success(res.data.message)
              //登陆成功的话,
              setTimeout(()=>{
                this.$router.push('api/userinfo')
              },1000)
            } else {
              this.$alert.fail(res.data.message)
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    getAllSignUpUser() {
      console.log('getAllSignUpUser');
      requestPost2('api/allSignUpUser').then(res => {
        console.log("all: ", res)
        this.registerUser.push(...res.data)
      })
      this.$alert.loading("在加载全部用户")
    }
  }
}
</script>

<style scoped>

</style>