import axios from "axios";
import router from "@/router";

// import app from "@/App";

// import Vue from 'vue'
import app from '@/main.js'
const baseUrl = 'http://192.168.68.125:8081'
const userToken = sessionStorage.getItem('userToken');
const myHttp = axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': userToken
        }
    }
)
myHttp.interceptors.request.use(config=>{
    // console.log(config);
    // console.log("debug",sessionStorage.getItem('userToken')&&sessionStorage.getItem('userId'));
    if (sessionStorage.getItem('userToken')&&sessionStorage.getItem('userId')){
        config.headers.Authorization = sessionStorage.getItem("userToken")
    }
    // if (sessionStorage.getItem('userToken')&&sessionStorage.getItem('userId'))
    return config
},error => {
    console.log(error)
});
myHttp.interceptors.response.use(res=>{
    if (res.data.code===401){
        // console.log('未登录');
        // app.config.globalProperties.$alert.fail(res.data.message)
        // setTimeout(()=>{
        //     app.config.globalProperties.$router.push('api/login')
        // },1000)
        // console.log(app);
    }
    // console.log(res);
    return res
},error => {
    console.log(error);
});

export default myHttp
