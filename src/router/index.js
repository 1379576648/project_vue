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
            {path:"/menu",component:()=>import('../components/sys/menu.vue')},
            //应收欠款
            {path:"/financing/debt",component:()=>import('../components/financing/debt.vue')},
            //应收欠款流水
            {path:"/financing/Balance",component:()=>import('../components/financing/Balance.vue')},
            // 收款历史
            {path:"/financing/collection",component:()=>import('../components/financing/collection.vue')},
            // 收款详情
            {path:"/financing/collection_details",component:()=>import('../components/financing/collection_details.vue')},
            // 收款单
            {path:"/financing/proceeds",component:()=>import('../components/financing/proceeds.vue')},
            //付款单
            {path:"/financing/payment",component:()=>import('../components/financing/payment.vue')},
            //付款历史
            {path:"/financing/payment_history",component:()=>import('../components/financing/payment_history.vue')},
            //付款详情
            {path:"/financing/payment_details",component:()=>import('../components/financing/payment_details.vue')},
            //资金流水
            {path:"/capitalFlow",component:()=>import('../components/financing/capitalFlow.vue')},
            //应付欠款
            {path:"/arrearsPayable",component:()=>import('../components/financing/arrearsPayable.vue')},
            //应付欠款流水
            {path:"/supplierArrearsFlow",component:()=>import('../components/financing/supplierArrearsFlow.vue')},
            {path:"/goin",component:()=>import('../components/commodity/goin.vue')},
            {path:"/edit",component:()=>import('../components/commodity/edit.vue')},
            {path:"/details",component:()=>import('../components/commodity/details.vue')},
            {path:"/classification",component:()=>import('../components/commodity/classification.vue')},
            {path:"/Purchasedetails",component:()=>import('../components/commodity/Purchasedetails.vue')},
            {path:"/addcommodity",component:()=>import('../components/commodity/addcommodity.vue')},
        ]
    },
    // 库存
    {path:"/stock",component:()=>import('../components/navigationbar.vue'),
        children:[
            {path: "/godownEntry", component: () => import('../components/stock/godownEntry.vue')},
            {
                path:"/earlyWarning",
                component:()=>import("../components/stock/earlyWarning.vue"),

            },
            {path:"/otherOutStock",component:()=>import('../components/stock/OtherOutStock.vue')},
            {path:"/otherOutStockAll",component:()=>import('../components/stock/OtherOutStockAll.vue')},
            {path:"/otherOutStockDetails",component:()=>import('../components/stock/OtherOutStockDetails.vue')},
            {path:"/Warehousing",component:()=>import('../components/stock/Warehousing.vue')},
            {path:"/Warehousedetails",component:()=>import('../components/stock/Warehousedetails.vue')},
            // 其他出入库类型
            {path:"/receipttype",component:()=>import('../components/stock/receipttype.vue')},

            //库存查询
            {path:"/Management",component:()=>import('../components/stock/Management.vue')},
            //仓库管理
            {path: "/Warehouse",component:()=>import('../components/stock/Warehouse.vue')},

            // 供应商列表
            {path: "/supplierList",component:()=>import('../components/stock/Supplier_list.vue')},

            // 供应商分类
            {path: "/supplierClassify",component:()=>import('../components/stock/Supplier_classify.vue')}


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
    //采购
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
                path:'/inGoods',component:()=>import('../components/purchase/inGoods.vue'),
            },
            {
                path:'/returnDetails',component:()=>import('../components/purchase/return_details.vue')
            }

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
