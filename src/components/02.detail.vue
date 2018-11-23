<template>
    <div>
        <!-- 路径 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/goods.html">购物商城</a>&gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- 购买信息 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 图片 -->
                            <div class="pic-box"></div>商品信息
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em
                                                id="commoditySellPrice"
                                                class="price"
                                            >¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number
                                                    v-model="buyCount"
                                                    :min="1"
                                                    :max="goodsinfo.stock_quantity"
                                                    label="描述文字"
                                                ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em
                                                    id="commodityStockNum"
                                                >{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button
                                                    onclick="cartAdd(this,'/',1,'/shopping.html');"
                                                    class="buy"
                                                >立即购买</button>
                                                <button
                                                    onclick="cartAdd(this,'/',0,'/cart.html');"
                                                    class="add"
                                                >加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- 图钉 吸顶 -->
                            <Affix :offset-top="0">
                                <div
                                    id="tabHead"
                                    class="tab-head"
                                    style="position: static; top: 517px; width: 925px;"
                                >
                                    <!-- tab栏 -->
                                    <ul>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="tabIndex = 0"
                                                :class="tabIndex==0?'selected':''"
                                            >商品介绍</a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="tabIndex = 1"
                                                :class="tabIndex==1?'selected':''"
                                                @on-change="pageChange"
                                            >商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- tab栏的内容 数据渲染 -->
                            <div
                                class="tab-content entry"
                                v-html="goodsinfo.content"
                                v-show="tabIndex==0"
                            ></div>
                            <!-- 评论区域 -->
                            <div class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea
                                                    id="txtContent"
                                                    name="txtContent"
                                                    sucmsg=" "
                                                    data-type="*10-1000"
                                                    nullmsg="请填写评论内容！"
                                                ></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input
                                                    id="btnSubmit"
                                                    name="submit"
                                                    type="submit"
                                                    value="提交评论"
                                                    class="submit"
                                                >
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p
                                            v-show="totalcount == 0"
                                            style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                                        >暂无评论，快来抢沙发吧！</p>
                                        <!-- 评论内容 -->
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!-- iView 分页组件 -->
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page
                                            :total="totalcount"
                                            show-sizer
                                            show-elevator
                                            @on-change="pageChange"
                                            placement="top"
                                            :page-size-opts="[6,8,12]"
                                            :page-size="pageSize"
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- 右侧列表 -->
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to=" '/detail/'+item.id ">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
// import axios from "axios";
import moment from "moment";
export default {
  name: "detail",
  data: function() {
    return {
      artID: "",
      //   详情页右侧
      hotgoodslist: [],
      //   详情页中间
      goodsinfo: [],
      //   详情页左侧
      imglist: [],
      //   选择购买数
      buyCount: 1,
      //   tab栏
      tabIndex: 0,
      //   评论
      comments: [],
      pageIndex: 1,
      pageSize: 6,
      totalcount: 0
    };
  },
  methods: {
    //   初始化
    initData() {
      this.artID = this.$route.params.artID;
      // 默认选择购买数量
      this.buyCount = 1;
      // 获取产品列表的信息   ▄︻┻┳═一
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(res => {
          console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });

      this.getComments();
    },

    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getComments();
    },
    getComments() {
      // 获取商品评论的信息
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          //   console.log(res);
          this.comments = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    }
  },
  created() {
    // console.log(this.$route.params);
    this.initData();
  },
  watch: {
    // 如果 `$route` 发生改变，这个函数就会运行
    // $route 为要侦听的数据
    $route: function(newVal, oldVal) {
      this.initData();
    }
  }
};
</script>
<style >
/* .tab-content img {
  display: block;
  max-width: 100%;
} */

/* .left-220 {
  float: right;
} */
</style>