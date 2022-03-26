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