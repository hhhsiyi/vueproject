<template>
  <div>
    <!--    <login-top center-title="注册"></login-top>-->
    <login-top>
      <!--      <template slot="right">退出</template>-->
      <template v-slot:center>注册</template>
      <template v-slot:left>后退</template>
      <template v-slot:right>
        <div @click="this.$router.push('/login')">
          切换登陆界面
        </div>
      </template>
    </login-top>
    <login-text
        label="姓名"
        style="margin: 4vw 0"
        placeholder="请输入姓名"
        :rule="commonRule"
        @passVerification="res => (account.name=res)"
    ></login-text>
    <login-text label="账号" placeholder="请输入账号" :rule="commonRule"
                @passVerification="res => (account.accountName=res)"></login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" :rule="commonRule"
                @passVerification="res => (account.password=res)"></login-text>
    <login-btn @btnClick="registerClick">
      <template v-slot:loginbtn>注册</template>
    </login-btn>

    <login-btn @click="getAllSignUpUser">
      <template v-slot:loginbtn>查询已有用户</template>
    </login-btn>
    <!--     rule="^.{6,16}$"6-16位任意字符-->
    <!--    @passVerification="successInput"-->

  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";
import {request, requestPost, requestPost2} from "@/network";
import axios from "axios";
import AllUser from "@/components/common/AllUser";

export default {
  name: "Register",
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
    AllUser
  },
  data() {
    return {
      account: {
        name: '',
        accountName: '',
        password: ''
      },
      commonRule: '^.{6,16}$',
      registerUser:[]
    }
  },
  methods: {
    // successInput(res) {
    //   console.log(res);
    //   this.account.name = res
    //   我们直接在上面就写完了
    // }
    //  接收到了点击注册按钮
    async registerClick() {
      console.log('点击注册');
      const regExp = new RegExp(this.commonRule);
      if (regExp.test(this.account.password) && regExp.test(this.account.name) && regExp.test(this.account.accountName)) {
        // if (this.account.password != '' && this.account.name != '' && this.account.accountName != '') {
        // if (regExp.test(this.account.password) && regExp.test(this.account.name) && regExp.test(this.account.accountName)) {
        console.log('正则校验全部成功');
        //拼接参数
        const postValue = {
          'name': this.account.name,
          'accountName': this.account.accountName,
          'password': this.account.password
        }
        // axios.defaults.baseURL = 'http://192.168.68.125:8081'
        // requestPost('api/signUp', postValue)
        //     .then(res => {
        //       console.log(res);
        //     }).catch(err => {
        //   err.log
        // })
        const res = await this.$myHttp.post('api/signUp', postValue)
            .then(
                res => {
                  console.log(res)
                  //    then里面的方法是异步的!
                  console.log("测试执行顺序1")
                  if (res.data.code === 0) {
                    this.$alert.success(res.data.message)
                    // console.log("debug:2 ",res.data.data.accountName);
                    // console.log("test",res.data.data.accountName);
                    sessionStorage.setItem('userId',res.data.data.id)
                    sessionStorage.setItem('userToken',res.data.data.userToken)
                    setTimeout(()=>{
                      this.$router.push("api/login")
                    },1000)
                  } else {
                    this.$alert.fail(res.data.message)
                  }
                }
            )
            .catch(err => console.log(err))
        console.log("debug1: ", res);
        console.log("测试执行顺序2")
        // 假如我想把我的方法变成同步的,我应该在函数前面加async
        // requestPost2('api/signUp',postValue)
        // .then(res=> console.log(res))
        // .catch(err=> console.log(err))
        // axios.post(
        //     'api/signUp', postValue
        // ).then(res => {
        //   console.log(res);
        // }).catch(err => {
        //   err.log
        // })
        // }
      } else
          // alert('传值为空')
        this.$alert.fail('正则校验未通过')
    },
    async registerClick2() {
      console.log('点击注册');
      const regExp = new RegExp(this.commonRule);
      if (regExp.test(this.account.password) && regExp.test(this.account.name) && regExp.test(this.account.accountName)) {
        const postValue = {
          'name': this.account.name,
          'accountName': this.account.accountName,
          'password': this.account.password
        }
        const res = await this.$myHttp.post('api/signUp', postValue)
        console.log(res);
        console.log("测试执行顺序2")
      } else
        this.$alert.fail('正则校验未通过')
    },
    getAllSignUpUser() {
      console.log('getAllSignUpUser');
      requestPost2('api/allSignUpUser').then(res=>{
        console.log("all: ",res)
        this.registerUser.push(...res.data)
      })
      this.$alert.loading("在加载全部用户")
    }
  }
}
</script>

<style scoped>

</style>