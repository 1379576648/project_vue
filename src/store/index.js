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
        ],

    }
})
export default store