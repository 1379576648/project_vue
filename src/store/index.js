import {createStore} from 'vuex'

const store = createStore({
    state: {
        menu: [
            {
                MENU_ID: 1,//菜单编号
                MENU_NAME: '工作台',//菜单名称Picture address
                MENU_ROUTE: '/workbench',//路由地址,
                PICTURE_ADDRESS: '&#xe605;',//图片地址
                MENU_MODULE: 'components/workbench_management/workbench_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 2,//菜单编号
                MENU_NAME: '组织管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 2.1,//菜单编号
                    MENU_NAME: '组织情报',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: 'organization/message',//路由地址
                    MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 2.11,//菜单编号
                        MENU_NAME: '部门详情',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_evectino',//路由地址
                        MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 2.12,//菜单编号
                        MENU_NAME: '职位详情',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    ]
                },
                ]
            },
            {
                MENU_ID: 3,//菜单编号
                MENU_NAME: '财务管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/financing',//路由地址
                MENU_MODULE: 'components/financing/financing_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 3.1,//菜单编号
                    MENU_NAME: '收付款',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/financing/message',//路由地址
                    MENU_MODULE: 'components/financing/collection',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 3.11,//菜单编号
                        MENU_NAME: '收款单',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/financing/message/receiving_financing',//路由地址
                        MENU_MODULE: 'components/financing/collection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 3.12,//菜单编号
                        MENU_NAME: '收款历史',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/financing/collection',//路由地址
                        MENU_MODULE: 'components/financing/collection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                        {
                            MENU_ID: 3.13,//菜单编号
                            MENU_NAME: '付款单',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/financing/message/receiving_financing',//路由地址
                            MENU_MODULE: 'components/financing/collection',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                        {
                            MENU_ID: 3.14,//菜单编号
                            MENU_NAME: '付款历史',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/financing/message/receiving_financing',//路由地址
                            MENU_MODULE: 'components/financing/payment_past',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                    ]
                },
                ]
            },
        ],

    }
})
export default store