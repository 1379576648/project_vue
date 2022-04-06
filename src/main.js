import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import VueAxios from 'vue-axios'
//导入自定义的路由文件
import router from './router'
//导入axios
import axios from 'axios'
//导入自定义的vuex文件
import store from "./store"
//将element-plus组件换成中文版
import zhCn from 'element-plus/es/locale/lang/zh-cn'

/**
 *以下代码为2021年12月13日最新加入代码，主要是解决最新
 *版本的icons导入问题。注：el官方目前尚在不断升级，
 *暂无统一导出，只能单独注册组件，该形式为自行拓展
 **/
//element-plus最新版本导入，该版本支持vue3
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
import * as ElIcons from '@element-plus/icons-vue'
const app=createApp(App).use(ElementPlus, {
    locale: zhCn,
}).use(router).use(VueAxios, axios).use(store)
// 统一注册el-icon图标
for(let iconName in ElIcons){
    // console.log(iconName)
    app.component(iconName,ElIcons[iconName])
}
/**以上代码为最新代码**/
//注册全局组件
app.use(VueAxios,axios).use(store).use(router).mount('#app')



