import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '@/assets/css/global.css'
import 'element-plus/dist/index.css'
import router from "@/router";

import Vant from 'vant';
import 'vant/lib/index.css';
import {Toast} from "vant";
import myHttp from "@/network/index2.js";
import utils from "@/utils.js"
//挂载到原型上,更好使
// Vue.prototype.$myHttp = myHttp
//--van-font-size-md
//vue3之后原型挂载变了


import moment from "moment"
//用于对时间进行处理

const app = createApp(App)
    .use(ElementPlus)
    .use(Vant)
    .use(router)
    .use(moment)
    // .use(Toast)

app.config.globalProperties.$myHttp = myHttp
app.config.globalProperties.$alert = Toast
app.config.globalProperties.$myDateMoment=moment
app.config.globalProperties.$utils = utils
// Vue.prototype.$moment = moment
app.mount('#app')

// export default
export default app