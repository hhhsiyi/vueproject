import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import app from '@/main.js'

//安装插件
// const User = ()=>import('@/components/User')
// const Default = ()=>import("@/components/HomeDefault")
const routes = [

    {
        path: '/',
        redirect: '/home'
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
        component: () => import("@/views/Userinfo"),
        meta: {
            //控制是否需要进行token校验操作
            istoken: true
        }
    },
    {
        path: '/edit',
        component: () => import("@/views/Edit"),
        meta: {
            //控制是否需要进行token校验操作
            istoken: true
        }
    },
    {
        path: '/home',
        component: ()=>import("@/views/Home"),

    },
    {
        path: '/test',
        component: ()=>import("@/views/Test")
    }
]


//创建
const router = new createRouter({
    routes,
    // mode: 'history'
    history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
    // console.log('to ', to)
    // console.log('from ', from)
    // console.log('next ', next)
    // if(to.path≡'/user')  进行路由判断
    if ((!sessionStorage.getItem('userToken') || !sessionStorage.getItem('userId')) && to.meta.istoken == true) {
        app.config.globalProperties.$alert.fail("请重新登录")
        setTimeout(() => {
            router.push('/login')
        }, 1000)
        // Vue.prototype.$msg.fail('请重新登录')
        return
    }
    next()
})

export default router