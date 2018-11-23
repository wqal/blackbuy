<template>
    <div>
        <!-- #1 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a>&gt;
                <a
                    href="#/site/goodslist"
                    class="router-link-exact-active router-link-active"
                >购物商城</a>
            </div>
        </div>
        <!-- #1 end -->
        <!-- #2 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <!-- 向右的箭头 -->
                                        <i class="iconfont icon-arrow-right"></i>
                                        <!-- 标题 -->
                                        <span>{{item.title}}</span>
                                        <!-- 三个类 -->
                                        <p>
                                            <span
                                                v-for="(it, i) in item.subcates"
                                                :key="it.id"
                                            >{{it.title}} &nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a
                                                    v-for="(it, i) in item.subcates"
                                                    :key="it.id"
                                                    href="/goods/43.html"
                                                >{{item.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <!-- 轮播图 -->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel height="341px">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="...">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!-- 右侧 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src=" item.img_url ">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | shortTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- #2 end -->
        <!-- #3 商品列表 -->
        <div class="section" v-for="(item, index) in grouplist" :key="item.grouplist">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a
                        v-for="(it, i) in item.subcateid"
                        :key="item.level1cateid"
                        href="/goods/43.html"
                    >{{it.parentTitle}}</a>
                    <a href="/goods/40.html">
                        更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <!-- https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96 -->
                        <li v-for="(it, i) in item.datas" :key="it.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/detail/'+it.artID">
                                <div class="img-box">
                                    <img :src="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元
                                    </p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>
                                            市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #3 商品列表 end -->
    </div>
</template>

<script>
// import axios from "axios";
//
import moment from "moment";
export default {
  name: "index",
  //   生命周期函数
  data: function() {
    return {
      // 分裂
      catelist: [],
      // 轮播图
      sliderlist: [],
      // 置顶
      toplist: [],
      // 商品列表
      grouplist: []
    };
  },
  // 页面加载完马上请求数据
  created() {
    //   获取轮播图及两侧的数据
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(res => {
        // console.log(res);
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      });
    //   获取商品列表的数据
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
      .then(res => {
        // console.log(res);
        this.grouplist = res.data.message;
      });
  }
};
</script>


<style>
.banner-img {
  width: 100%;
  height: 100%;
}
</style>
