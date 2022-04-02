import {createStore} from 'vuex'

const store = createStore({
    state: {
        menu: [
            {
                MENU_ID: 1,//菜单编号
                MENU_NAME: '首页',//菜单名称Picture address
                MENU_ROUTE: '/workbench',//路由地址,
                PICTURE_ADDRESS: '&#xe605;',//图片地址
                MENU_MODULE: 'components/workbench_management/workbench_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 2,//菜单编号
                MENU_NAME: '销售管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 2.1,//菜单编号
                    MENU_NAME: '销售单',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: 'organization/message',//路由地址
                    MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                },
                    {
                        MENU_ID: 2.2,//菜单编号
                        MENU_NAME: '销售历史',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_evectino',//路由地址
                        MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 2.3,//菜单编号
                        MENU_NAME: '销售明细汇总',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 2.4,//菜单编号
                        MENU_NAME: '退货单',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 2.5,//菜单编号
                        MENU_NAME: '退货历史',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 2.6,//菜单编号
                        MENU_NAME: '客户列表',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                ]
            },
            {
                MENU_ID: 3,//菜单编号
                MENU_NAME: '商品管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 4,//菜单编号
                MENU_NAME: '采购管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 5,//菜单编号
                MENU_NAME: '库存管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 6,//菜单编号
                MENU_NAME: '财务管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/financing',//路由地址
                MENU_MODULE: 'financing/financing_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 6.1,//菜单编号
                    MENU_NAME: '应收欠款',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/financing/debt',//路由地址
                    MENU_MODULE: '/components/financing/debt',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                },
                    {
                        MENU_ID: 6.2,//菜单编号
                        MENU_NAME: '应付欠款',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: 'financing/message',//路由地址
                        MENU_MODULE: '/components/financing/',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 6.3,//菜单编号
                        MENU_NAME: '收款单',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: 'financing/message',//路由地址
                        MENU_MODULE: '/components/financing/',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 6.4,//菜单编号
                        MENU_NAME: '收款历史',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/financing/collection',//路由地址
                        MENU_MODULE: '/components/financing/collection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 6.5,//菜单编号
                        MENU_NAME: '付款单',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: 'financing/message/receiving',//路由地址
                        MENU_MODULE: '/components/financing/',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 6.6,//菜单编号
                        MENU_NAME: '付款历史',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: 'financing/message/receiving',//路由地址
                        MENU_MODULE: '/components/financing/',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 6.7,//菜单编号
                        MENU_NAME: '资金流水',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/financing/message/else',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                ]
            },
            {
                MENU_ID: 7,//菜单编号
                MENU_NAME: '系统管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/sys',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son:[
                    {
                        MENU_ID: 7.1,//菜单编号
                        MENU_NAME: '账户管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/user',//路由地址
                        MENU_MODULE: 'organization_management/organization_main',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    {
                        MENU_ID: 7.2,//菜单编号
                        MENU_NAME: '权限设置',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/role',//路由地址
                        MENU_MODULE: 'organization_management/organization_main',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }
                ]
            }
        ],

    }
})
export default store