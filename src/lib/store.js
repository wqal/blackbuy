// 引入Vuex 核心插件
import Vuex from "vuex";
import Vue from "vue";
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

export default store;
