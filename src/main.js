import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
Vue.use(VueRouter);
// 全局样式
import "./assets/site/css/style.css";

import axios from "axios";
Vue.prototype.$axios = axios;

axios.defaults.withCredentials = true; //让ajax携带cookie

// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";

// 导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
Vue.use(ElementUI);

// 导入 iView 框架
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(VueRouter);
Vue.use(iView);

// 引入放大镜组件 GitHub中的
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

import moment from "moment";
Vue.filter("shortTime", value => {
  return moment().format("YYYY - MM - DD");
  // return value.charAt(0).toUpperCase() + value.slice(1)
});
Vue.filter("shortTimePlus", value => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
  // return value.charAt(0).toUpperCase() + value.slice(1)
});

// 首页
import index from "./components/index.vue";
// 详情列表
import detail from "./components/02.detail.vue";
// 购物车
import shopCart from "./components/03.shopCart.vue";
// 订单
import order from "./components/04.order.vue";
// 登录
import login from "./components/05.login.vue";
// 付钱
import payMoney from "./components/06.payMoney.vue";
// 付钱成功页面
import paySuccess from "./components/07.paySuccess.vue";
// 会员中心
import vipCenter from "./components/08.vipCenter.vue";
import orderList from "./components/09.orderList.vue";
import orderDetail from "./components/10.orderDetail.vue";
import vipIndex from "./components/11.vipIndex.vue";

let routes = [
  {
    path: "/",
    // 重定向
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  {
    path: "/detail/:artID",
    component: detail
  },
  {
    path: "/shopCart",
    component: shopCart
  },
  {
    path: "/order/:ids",
    component: order
  },
  {
    path: "/login",
    component: login,
    meta: {
      checkLogin: true
    }
  },
  {
    path: "/payMoney/:orderid",
    component: payMoney,
    // 路由元信息
    meta: {
      checkLogin: true
    }
  },
  {
    path: "/paySuccess",
    component: paySuccess,
    meta: {
      checkLogin: true
    }
  },
  {
    path: "/vipCenter",
    component: vipCenter,
    meta: {
      checkLogin: true
    },
    children: [
      {
        path: "",
        redirect: "/vipIndex"
      },
      {
        path: "/vipIndex",
        component: vipIndex
      },
      {
        path: "orderList",
        component: orderList
      },
      {
        path: "orderDetail/:orderID",
        component: orderDetail
      }
    ]
  }
];

// 实例化路由对象
let router = new VueRouter({
  mode: 'history',
  routes,
});

// 引入Vuex 核心插件
import Vuex from "vuex";
Vue.use(Vuex);

// 创建一个 store 库
const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem("cartdata")) || {},
    isLogin: false
  },
  // store中的计算属性
  // 计算购物车里面的总商品数 显示在右上角处
  getters: {
    totalCount(state) {
      let num = 0;
      for (const key in state.cartData) {
        num += state.cartData[key];
      }
      return num;
    }
  },
  // 相当于Vuex中的方法 改变store中的数据
  mutations: {
    addToCart(state, obj) {
      console.log(state);
      // console.log(obj); // goodID: "91", goodNum: 1
      // 如果商品存在
      if (state.cartData[obj.goodID] != undefined) {
        // 下面代码的简写
        state.cartData[obj.goodID] += obj.goodNum;
        // let oldNum = state.cartData[obj.goodID];
        // oldNum += obj.goodNum;
        // state.cartData[obj.goodID] = oldNum;
      } else {
        //商品不存在
        Vue.set(state.cartData, obj.goodID, obj.goodNum);
      }
      console.log(state.cartData);
    },
    updateCart(state, obj) {
      // console.log(obj);
      state.cartData = obj;
    },
    delGoodById(state, id) {
      Vue.delete(state.cartData, id);
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});

// 浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("cartdata", JSON.stringify(store.state.cartData));
};

// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // 调用接口判断是否登录
  if (to.path.indexOf("/order") != -1) {
    // if (to.meta.checkLogin == true) {
    // 在去订单页面之前先判断是否登录？
    axios.get("site/account/islogin").then(res => {
      // console.log(res);
      if (res.data.code == "nologin") {
        Vue.prototype.$Message.warning("请先登录");
        router.push("/login");
      } else {
        next();
      }
    });
  } else {
    // next 如果不执行就不会路由跳转
    next();
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

new Vue({
  render: h => h(App),
  router,
  // 把store传递给 Vue实例 才可以在子组件中使用$store
  store,
  
  // 此代码段避免页面刷新登录状态丢失
  // 调用接口判断是否登录
  created() {
    axios.get("site/account/islogin").then(res => {
      console.log(res);
      if (res.data.code == "nologin") {
        Vue.prototype.$Message.warning("请先登录");
        router.push("/login");
      } else {
        store.state.isLogin = true;
        // next();
      }
    });
  }
}).$mount("#app");
