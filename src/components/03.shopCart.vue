<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input
              id="jsondata"
              name="jsondata"
              type="hidden"
            >
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th
                    width="48"
                    align="center"
                  >
                    <a>选择</a>
                  </th>
                  <th align="left">商品信息</th>
                  <th
                    width="84"
                    align="left"
                  >单价</th>
                  <th
                    width="104"
                    align="center"
                  >数量</th>
                  <th
                    width="104"
                    align="center"
                  >金额(元)</th>
                  <th
                    width="54"
                    align="center"
                  >操作</th>
                </tr>
                <!-- 有数据的提示内容 -->
                <tr
                  v-for="(item, index) in goodList"
                  :key="item.id"
                >
                  <td>
                    <!-- Switch 开关 -->
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </td>
                  <td align="left">
                    <!-- 图片 -->
                    <img :src="item.img_url">
                    <!-- 标题 -->
                    <span class="goodTitle">{{ item.title }}</span>
                  </td>
                  <!-- 单价 -->
                  <td width="84">
                    {{ item.sell_price }}
                  </td>
                  <!-- 数量  element-ui计数器 -->
                  <td>
                    <el-input-number
                      v-model="item.buyCount"
                      :min="1"
                    ></el-input-number>
                  </td>
                  <!-- 金额 -->
                  <td align='center'> {{ item.sell_price * item.buyCount }} </td>
                  <!-- 删除按钮 Element-ui Button组件 -->
                  <td>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="delOne(item.id)"
                    ></el-button>
                  </td>
                </tr>
                <!-- 没有数据的提示内容 -->
                <tr v-show="goodList.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    align="right"
                    colspan="8"
                  >
                    已选择商品
                    <b
                      class="red"
                      id="totalQuantity"
                    > {{selectedCount}} </b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b
                      class="red"
                      id="totalAmount"
                    > {{selectedPrice}} </b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button
                class="button"
                onclick="javascript:location.href='/index.html';"
              >继续购物</button>
              <router-link :to="'/order/'+selectedIds">
                <button class="submit">立即结算</button>
              </router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "shopCart",
  data: function() {
    return {
      // 购物车商品
      goodList: []
    };
  },
  methods: {
    delOne(id) {
      //  MessageBox 弹框  (确认框)  Element-ui
      this.$confirm("此操作将删除该商品, 是否删除?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 如果点了确定执行这里的代码
          this.goodList.forEach((v,index) => {
            if (v.id == id) {
              this.goodList.splice(index, 1);
            }
          });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          // 如果点了取消执行这里的代码
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  // 计算属性
  computed: {
    // 选中的商品总个数
    selectedCount() {
      let num = 0;
      this.goodList.forEach(v => {
        if (v.isSelected == true) {
          num += v.buyCount;
        }
      });
      return num;
    },
    selectedPrice() {
      let price = 0;
      this.goodList.forEach(v => {
        if (v.isSelected == true) {
          price += v.buyCount * v.sell_price;
        }
      });
      return price;
    },
    // 计算购物车里面的
    selectedIds() {
      let ids = "";
      this.goodList.forEach(v => {
        if (v.isSelected == true) {
          ids += v.id;
          ids += ",";
        }
      });
      // 去掉最后的 ，逗号
      ids = ids.slice(0, ids.length - 1);
      return ids;
    }
  },
  created() {
    let ids = "";
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, ids.length - 1);
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
      // console.log(res);
      // 在res中循环加入 isSelected 属性  值默认为true
      res.data.message.forEach(v => {
        v.buyCount = this.$store.state.cartData[v.id];
        v.isSelected = true;
      });
      this.goodList = res.data.message;
    });
  },
  watch: {
    goodList: {
      handler: function(val, oldVal) {
        let obj = {};
        val.forEach(v => {
          obj[v.id] = v.buyCount;
        });
        this.$store.commit("updateCart", obj);
      },
      deep: true
    }
  }
};
</script>

<style >
td img {
  display: inline-block;
  width: 100px;
}
td:nth-child(2) {
  display: flex;
  align-items: center;
}
td .goodTitle {
  padding-left: 15px;
}
</style>
