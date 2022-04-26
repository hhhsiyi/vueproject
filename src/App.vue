<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <Header></Header>-->
<!--  <div style="display: flex">-->
<!--    <LeftBar/>-->
<!--  </div>-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  <element></element>-->
<!--  <register></register>-->
<!--  <login></login>-->
<!--  <router-link to="/register" replace>注册</router-link>-->
<!--  <router-link to="/login" replace>登陆</router-link>-->
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Element from "@/components/common/Element";
import Header from "@/components/common/Header";
import LeftBar from '@/components/LeftBar'
import Register from "@/views/Register";
import Login from "@/views/Login";
// import Edit from "@/views/Edit";
export default {
  name: 'App',
  components: {
    HelloWorld,
    Element,
    Header,
    LeftBar,
    Register,
    Login
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 4vw;
  text-align: center;

}
</style>
