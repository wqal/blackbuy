import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
Vue.use(VueRouter);
// 全局样式
import "./assets/site/css/style.css";
// 导入路由对象
import router from "./lib/router";
import store from "./lib/store";
import "./lib/filters";
import "./lib/plugin";

// 浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("cartdata", JSON.stringify(store.state.cartData));
};

new Vue({
  render: h => h(App),
  router,
  // 把store传递给 Vue实例 才可以在子组件中使用$store
  store,
  // 此代码段避免页面刷新登录状态丢失
  // 调用接口判断是否登录
  created() {
    this.$axios.get("site/account/islogin").then(res => {
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
