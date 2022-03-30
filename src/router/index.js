import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import store from '../store/index.js';

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
            {path:"/financing/collection",component:()=>import('../components/financing/collection.vue')},
            {path:"/financing/payment",component:()=>import('../components/financing/payment.vue')},
        ]
    },
    {path:"/stock",component:()=>import('../components/navigationbar.vue'),
        children:[
            {path:"/otherOutStock",component:()=>import('../components/stock/OtherOutStock.vue')},
            // {path:"/user",component:()=>import('../components/sys/user.vue')},
            // {path:"/role",component:()=>import('../components/sys/role.vue')},
            // {path:"/financing/collection",component:()=>import('../components/financing/collection.vue')},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function (to, from, next) {
    next()

});
export default router
