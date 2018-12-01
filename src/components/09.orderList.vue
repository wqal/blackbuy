<template>
  <div class="right-auto orderList">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr
              v-for="(item, index) in goodList"
              :key="item.id"
            >
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br> {{item.paymentTitle}}
              </td>
              <td align="left">{{item.add_time | shortTimePlus }}</td>
              <td align="left">
                {{item.statusName}}
              </td>
              <td align="left">
                <!-- <a
                  href="#/site/member/orderinfo/12"
                  class=""
                > -->
                <router-link :to="'/vipCenter/orderDetail/'+item.id">查看订单</router-link>
                <!-- </a> -->
                <br>
                <!-- <a
                  href="#/site/goods/payment/12"
                  class=""
                > -->
                <router-link :to="'/payMoney/'+item.id">|去付款</router-link>
                <!-- </a> -->
                <br>
                <!-- <a href="javascript:void(0)">|取消</a> -->
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <!-- Element-ui 分页组件 -->
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageIndexChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            :total="totalCount"
            layout="total, sizes, prev, pager, next, jumper"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data: function() {
    return {
      pageIndex: 1,
      pageSize: 5,
      goodList: [],
      totalCount: 1
    };
  },
  methods: {
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getOrderList();
    },
    pageIndexChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getOrderList();
    },
    // 获取订单列表数据
    getOrderList() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
          this.goodList = res.data.message;
          // 总订单数量
          this.totalCount = res.data.totalcount;
        });
    }
  },
  created() {
    // 渲染订单列表
    this.getOrderList();
  }
};
</script>

<style>
</style>

