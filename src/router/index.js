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
            {path:"/financing/payment_history",component:()=>import('../components/financing/payment_history.vue')},
            {path:"/financing/payment_details",component:()=>import('../components/financing/payment_details.vue')},
            {path:"/goin",component:()=>import('../components/commodity/goin.vue')},
            {path:"/edit",component:()=>import('../components/commodity/edit.vue')},
            {path:"/details",component:()=>import('../components/commodity/details.vue')},
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
    //销售
    {path:"/market",component:()=>import('../components/navigationbar.vue'),
        children:[
            //退货单
            {path:"/refundReturn",component:()=>import('../components/market/refundReturn.vue')},
             //销售单
            {path:"/salesTicket",component:()=>import('../components/market/salesTicket.vue')},
            //销售历史
            {path:"/salesHistory",component:()=>import('../components/market/salesHistory.vue')},
             //销售明细
            {path:"/salesParticular",component:()=>import('../components/market/salesParticular.vue')},
             //退货历史
            {path:"/refundHistory",component:()=>import('../components/market/refundHistory.vue')},
             //客户
            {path:"/client",component:()=>import('../components/market/client.vue')},

        ]
    },
    {
        path:"/purchase",component:()=>import('../components/navigationbar.vue'),
        children:[
            {
                path:'/returnOrder',component:()=>import('../components/purchase/return_order.vue')
            },
            {
                path:'/returnHistory',component:()=>import('../components/purchase/return_history.vue')
            },
            {
                path:'/purchaseHistory',component:()=>import('../components/purchase/purchase_history.vue')
            },
            {
                path:'/inGoods',component:()=>import('../components/purchase/inGoods.vue')
            }

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
