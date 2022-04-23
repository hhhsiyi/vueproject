import Vue from 'vue'
import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";
//安装插件
// const User = ()=>import('@/components/User')
// const Default = ()=>import("@/components/HomeDefault")
const routes = [

    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/register',
        component: () => import("@/views/Register"),
        meta: {
            title: '注册1'
        },
    },
    {
        path: '/login',
        component: () => import("@/views/Login"),
        meta: {
            title: '登陆'
        },
    },
    {
        path: '/userinfo',
        component: () => import("@/views/Userinfo")
    },
]

//创建
const router = new createRouter({
    routes,
    // mode: 'history'
    history: createWebHistory(),
})

export default router