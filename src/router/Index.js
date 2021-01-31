import Vue from 'vue'
import VueRouter from 'vue-router'


//引入路由组件
import MSite from "../pages/MSite/MSite";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
import Order from "../pages/Order/Order";
import Login from "@/pages/Login/Login";

import Shop from "@/pages/Shop/Shop";

import Goods from "@/pages/Shop/Children/Goods";
import Info from "@/pages/Shop/Children/Info";
import Ratings from "@/pages/Shop/Children/Ratings";

//插件必须先申明再使用
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/msite', component: MSite,meta:{isShowFooter:true} },
        { path: '/search', component: Search ,meta:{isShowFooter:true}},
        { path: '/profile', component: Profile,meta:{isShowFooter:true} },
        { path: '/order', component: Order,meta:{isShowFooter:true} },
        { path: '/login', component: Login },
        {
            path: '/shop',
            component: Shop,
            children:[
                { path: '/shop/goods', component: Goods },
                { path: '/shop/ratings', component: Ratings },
                { path: '/shop/info', component: Info },
                { path: '/shop/', redirect: '/shop/goods' },

            ]
        },
        { path: '/', redirect: '/msite' }    //配置重定向
    ]
})