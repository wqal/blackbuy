<template>
  <div class="right-auto orderDetail">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <a
          href="javascript:void(0)"
          class="add"
          @click="$router.go(-1)"
        >
          <i class="iconfont icon-reply"></i>返回</a>
        <ul>
          <li class="selected">
            <a href="javascript:;">查看订单</a>
          </li>
        </ul>
      </div>
      <div class="order-progress">
        <ul>
          <li
            :class="{active:orderinfo.status>=1}"
            class="first active"
          >
            <div class="progress">下单</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li
            :class="{active:orderinfo.status>=2}"
            class=""
          >
            <div class="progress">已付款</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li
            :class="{active:orderinfo.status>=2}"
            class=""
          >
            <div class="progress">已经发货</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li
            :class="{active:orderinfo.status>=4}"
            class="last"
          >
            <div class="progress">已完成</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
        </ul>
      </div>
      <div class="form-box accept-box form-box1">
        <dl class="head form-group">
          <dd>
            订单号：{{orderinfo.order_no}}

            <!-- <a
              href="#/site/goods/payment/12"
              class="btn-pay"
            > -->
            <router-link
              :to="'/payMoney/' + orderID"
              class="btn-pay"
              v-show="orderinfo.status==1"
            >去付款</router-link>
            <a
              class="btn-pay"
              @click="receive"
              v-show="orderinfo.status==2"
            >确认收货</a>
            <a
              class="btn-pay"
              @click="receive"
              v-show="orderinfo.status==4"
            >去评价</a>
            <!-- </a> -->
            <!---->
          </dd>
        </dl>
        <dl class="form-group">
          <dt>订单状态：</dt>
          <dd>
            {{orderinfo.statusName}}
          </dd>
        </dl>
        <dl class="form-group">
          <dt>快递单号：</dt>
          <dd>
            {{orderinfo.order_no}}
          </dd>
        </dl>
        <dl class="form-group">
          <dt>支付方式：</dt>
          <dd>支付宝</dd>
        </dl>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="5"
          class="ftable"
        >
          <tbody>
            <tr>
              <th align="left">商品信息</th>
              <th width="60%">名称</th>
              <th width="10%">单价
              </th>
              <th width="10%">数量</th>
              <th width="10%">金额</th>
            </tr>
            <tr
              v-for="(item, index) in goodslist"
              :key="item.goods_id"
            >
              <td width="60">
                <img
                  :src="item.imgurl"
                  class="img"
                >
              </td>
              <td align="left">
                <!-- <a
                  target="_blank"
                  href="/goods/show-92.html"
                >{{item.goods_title}}</a> -->
                <router-link :to="'/detail/'+item.goods_id">{{item.goods_title}}</router-link>
              </td>
              <td align="center">
                <s>￥{{item.real_price}}</s>
                <p>￥{{item.goods_price}}</p>
              </td>
              <td align="center">{{item.quantity}}</td>
              <td align="center">￥{{item.goods_price * item.quantity }}</td>
            </tr>
            <tr>
              <td
                colspan="7"
                align="right"
              >
                <p>商品金额：
                  <b class="red">￥{{orderinfo.real_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                  <b class="red">￥{{orderinfo.express_fee}}</b>
                </p>
                <p style="font-size: 22px;">应付总金额：
                  <b class="red">￥{{orderinfo.order_amount}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-box accept-box">
        <dl class="head form-group">
          <dd>收货信息</dd>
        </dl>
        <dl class="form-group">
          <dt>顾客姓名：</dt>
          <dd>{{orderinfo.accept_name}}</dd>
        </dl>
        <dl class="form-group">
          <dt>送货地址：</dt>
          <dd>{{orderinfo.area+orderinfo.address}}</dd>
        </dl>
        <dl class="form-group">
          <dt>联系电话：</dt>
          <dd>{{orderinfo.mobile}} </dd>
        </dl>
        <dl class="form-group">
          <dt>电子邮箱：</dt>
          <dd> {{orderinfo.email}}</dd>
        </dl>
        <dl class="form-group">
          <dt>备注留言：</dt>
          <dd>{{orderinfo.message}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data: function() {
    return {
      orderID: 0,
      goodslist: [],
      orderinfo: {}
    };
  },
  methods: {
    receive() {
      this.$axios
        .get(`site/validate/order/complate/${this.orderID}`)
        .then(res => {
          console.log(res);
          this.$confirm("确认收货钱将会进入商家账户,是否收货?", "温馨提示", {
            confirmButtonText: "收货",
            cancelButtonText: "再考虑",
            type: "warning"
          })
            .then(() => {
              // 如果点了确定执行这里的代码
              this.$message({
                type: "success",
                message: "已收货"
              });
              this.getorderinfo();
            })
            .catch(() => {
              // 如果点了取消执行这里的代码
              this.$message({
                type: "info",
                message: "已取消收货"
              });
            });
        });
    },
    getorderinfo() {
      this.$axios
        .get(`site/validate/order/getorderdetial/${this.orderID}`)
        .then(res => {
          console.log(res);
          this.goodslist = res.data.message.goodslist;
          this.orderinfo = res.data.message.orderinfo;
        });
    }
  },
  created() {
    this.orderID = this.$route.params.orderID;
    this.getorderinfo();
  }
};
</script>

<style>
</style>

