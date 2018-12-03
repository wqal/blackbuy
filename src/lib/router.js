import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// 首页
import index from "../components/index.vue";
// 详情列表
import detail from "../components/02.detail.vue";
// 购物车
import shopCart from "../components/03.shopCart.vue";
// 订单
import order from "../components/04.order.vue";
// 登录
import login from "../components/05.login.vue";
// 付钱
import payMoney from "../components/06.payMoney.vue";
// 付钱成功页面
import paySuccess from "../components/07.paySuccess.vue";
// 会员中心
import vipCenter from "../components/08.vipCenter.vue";
// 订单列表
import orderList from "../components/09.orderList.vue";
// 订单详细
import orderDetail from "../components/10.orderDetail.vue";
// 会员中心首页
import vipIndex from "../components/11.vipIndex.vue";

// 路由规则
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
  // 去掉url中的 # 号
  mode: "history",
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  // 调用接口判断是否登录
  if (to.path.indexOf("/order") != -1) {
    // if (to.meta.checkLogin == true) {
    // 在去订单页面之前先判断是否登录？
    Vue.prototype.$axios.get("site/account/islogin").then(res => {
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

// 暴露
export default router;
