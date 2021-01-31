import Vue from 'vue'
import "lib-flexible/flexible"
import App from './App.vue'
import  router from "./router/Index"
import store from "./vuex/store"
import Header from "@/components/Header/Header";
import Stars from "@/components/Stars/Stars";
import "./utils/validate"   //用于表单验证

import { Button } from 'mint-ui';

import * as API from "./api/req" //一次性把所有的请求函数都拿过来 再放到Vue的原型对象上这样所有的组件对象都能看见
import i18n from './i18n'

Vue.prototype.$API = API;

//注册全局组件
Vue.component("Header",Header)
Vue.component("Stars",Stars)

Vue.component(Button.name, Button);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  i18n,

  //注册使用store.js  这样所有的组件对象身上都可以拿到$store对象
  store
}).$mount('#app')
