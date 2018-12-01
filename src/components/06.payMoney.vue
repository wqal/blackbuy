<template>
  <div class="payMoney">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a
              href="javascript:;"
              class="selected"
            >支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area+orderInfo.address}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <!-- 二维码区域 -->
              <div class="el-col el-col-6">
                <div id="container2">
                  <!-- <canvas width="300" height="300" > </canvas> -->
                  <!-- 二维码 -->
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderid"
                    :options="{ size: 250 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 注册二维码
import VueQrcode from "@xkeshi/vue-qrcode";
// 全局注册
// Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "payMoney",
  data: function() {
    return {
      // 订单页传过来的订单id
      orderid: 0,
      // 声明一个数据存储请求回来的订单信息
      orderInfo: {}
    };
  },
  // 注册局部二维码
  components: {
    [VueQrcode.name]: VueQrcode
  },
  // 生命周期函数
  created() {
    // console.log(this.$route);
    this.orderid = this.$route.params.orderid;
    // 根据订单id（orderid）请求数据渲染订单页
    this.$axios
      .get("site/validate/order/getorder/" + this.orderid)
      .then(res => {
        // console.log(res);
        this.orderInfo = res.data.message[0];
      });

    // 轮询 每隔2秒查询一次
    // 使用箭头函数
    this.timerID = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(res => {
          // console.log(res);
          if (res.data.message[0].status === 2) {
            this.$Message.success("恭喜你支付成功，请耐心等待收货。。。。");
            this.$router.push("/paySuccess");
          }
        });
    }, 2000);
  },
  // 生命周期函数 完成时调用
  // 完成时清除定时器
  destroyed() {
    clearInterval(this.timerID);
  }
};
</script>

<style>
</style>



