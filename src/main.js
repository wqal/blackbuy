import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 全局样式
import './assets/site/css/style.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


import index from './components/index.vue'

let routes = [{
    path: '/',
    // 重定向
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  }
]

// 实例化路由对象
let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),

  router
}).$mount('#app')