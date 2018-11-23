import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;

import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 全局样式
import './assets/site/css/style.css'

// 导入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册到Vue上
Vue.use(ElementUI);

// 导入 iView 框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueRouter);
Vue.use(iView);

// 首页
import index from './components/index.vue'
// 详情列表
import detail from './components/02.detail.vue'

let routes = [{
    path: '/',
    // 重定向
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: "/detail/:artID",
    component: detail
  }
]

// 实例化路由对象
let router = new VueRouter({
  routes
})

import moment from 'moment';
Vue.filter('shortTime', value => {
  return moment().format("YYYY - MM - DD");
  // return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('shortTimePlus', value => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
  // return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  render: h => h(App),

  router
}).$mount('#app')