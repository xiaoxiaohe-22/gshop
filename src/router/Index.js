import Vue from 'vue'
import VueRouter from 'vue-router'


//引入路由组件
import MSite from "../pages/MSite/MSite";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
import Order from "../pages/Order/Order";

//插件必须先申明再使用
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/msite', component: MSite },
        { path: '/search', component: Search },
        { path: '/profile', component: Profile },
        { path: '/order', component: Order },
        { path: '/', redirect: '/msite' }    //配置重定向
    ]
})