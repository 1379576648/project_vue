import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import store from '../store/index.js';
import {ElMessage } from 'element-plus'
/***
 * 批量导入组件
 * @type {Record<string, () => Promise<{[p: string]: any}>>}
 */
const modules = import.meta.glob('../components/**/*.vue');
const routes = [
    {path: "/",redirect:"/workbench"},
    {path:"/home",component:()=>import('../components/navigationbar.vue'),
        children:[
            {path:"/workbench",component:()=>import('../components/workbench_management/workbench_main.vue')},
            {path:"/user",component:()=>import('../components/sys/user.vue')},
            {path:"/role",component:()=>import('../components/sys/role.vue')},
            {path:"/menu",component:()=>import('../components/sys/menu.vue')}
        ]
    },
    { path: '/login', component: ()=>import('../components/sys/login.vue') },
    { path: '/:catchAll(.*)',name:'404', component: ()=>import('../components/404/404.vue') }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach((to,from,next)=>{
    var user=store.state.user
    var menus=store.state.menu
	if(to.path == '/login' || to.path == '/register' || JSON.stringify(user)!=="{}"){
	  next();
	}else{
    //   alert('您还没有登录，请先登录');
    ElMessage ({
        message:'您还没有登录，请先登录',
        type: 'warning',
        duration:1000
    })
	  next('/login');
	}
  })
export default router