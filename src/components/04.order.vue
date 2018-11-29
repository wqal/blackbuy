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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div
              id="orderForm"
              name="orderForm"
              url=""
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- 收货人姓名 -->
                <el-form-item
                  label="收货人姓名"
                  prop="accept_name"
                >
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <!-- 省市联动 -->
                <el-form-item
                  label="所属地区"
                  prop="area"
                >
                  <v-distpicker
                    @selected="selectedArea"
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></v-distpicker>
                </el-form-item>
                <!-- 详细地址 -->
                <el-form-item
                  label="详细地址"
                  prop="address"
                >
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <!-- 手机号码 -->
                <el-form-item
                  label="手机号码"
                  prop="mobile"
                >
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <!-- 邮编 -->
                <el-form-item
                  label="邮编"
                  prop="post_code"
                >
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item
                  label="邮箱"
                  prop="email"
                >
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <!-- <div class="form-box address-info">
                <dl class="form-group">
                  <dt>收货人姓名：</dt>
                  <dd>
                    <input
                      name="book_id"
                      id="book_id"
                      type="hidden"
                      value="0"
                    >
                    <input
                      name="accept_name"
                      id="accept_name"
                      type="text"
                      class="input"
                      value=""
                      datatype="s2-20"
                      sucmsg=" "
                    >
                    <span class="Validform_checktip">*收货人姓名</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>所属地区：</dt>
                  <dd>
                    <select
                      id="province"
                      name="province"
                      class="select"
                    >
                      <option value="">所属省份</option>
                      <option value="北京市">北京市</option>
                      <option value="天津市">天津市</option>
                      <option value="河北省">河北省</option>
                      <option value="山西省">山西省</option>
                      <option value="内蒙古自治区">内蒙古自治区</option>
                      <option value="辽宁省">辽宁省</option>
                      <option value="吉林省">吉林省</option>
                      <option value="黑龙江省">黑龙江省</option>
                      <option value="上海市">上海市</option>
                      <option value="江苏省">江苏省</option>
                      <option value="浙江省">浙江省</option>
                      <option value="安徽省">安徽省</option>
                      <option value="福建省">福建省</option>
                      <option value="江西省">江西省</option>
                      <option value="山东省">山东省</option>
                      <option value="河南省">河南省</option>
                      <option value="湖北省">湖北省</option>
                      <option value="湖南省">湖南省</option>
                      <option value="广东省">广东省</option>
                      <option value="广西壮族自治区">广西壮族自治区</option>
                      <option value="海南省">海南省</option>
                      <option value="重庆市">重庆市</option>
                      <option value="四川省">四川省</option>
                      <option value="贵州省">贵州省</option>
                      <option value="云南省">云南省</option>
                      <option value="西藏自治区">西藏自治区</option>
                      <option value="陕西省">陕西省</option>
                      <option value="甘肃省">甘肃省</option>
                      <option value="青海省">青海省</option>
                      <option value="宁夏回族自治区">宁夏回族自治区</option>
                      <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
                      <option value="香港特别行政区">香港特别行政区</option>
                      <option value="澳门特别行政区">澳门特别行政区</option>
                      <option value="台湾省">台湾省</option>
                      <option value="其它">其它</option>
                    </select>
                    <select
                      id="city"
                      name="city"
                      class="select"
                    >
                      <option value="">所属城市</option>
                    </select>
                    <select
                      id="area"
                      name="area"
                      class="select"
                      datatype="*"
                      sucmsg=" "
                    >
                      <option value="">所属地区</option>
                    </select>
                    <span class="Validform_checktip">*请选择您所在的地区</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>详细地址：</dt>
                  <dd>
                    <input
                      name="address"
                      id="address"
                      type="text"
                      class="input"
                      value=""
                      datatype="*2-100"
                      sucmsg=" "
                    >
                    <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>手机号码：</dt>
                  <dd>
                    <input
                      name="mobile"
                      id="mobile"
                      type="text"
                      class="input"
                      value=""
                      datatype="m"
                      sucmsg=" "
                    >
                    <span class="Validform_checktip">*收货人的手机号码</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>联系电话：</dt>
                  <dd>
                    <input
                      name="telphone"
                      id="telphone"
                      type="text"
                      class="input"
                      value=""
                    >
                    <span class="Validform_checktip">收货人的联系电话，非必填</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>电子邮箱：</dt>
                  <dd>
                    <input
                      name="email"
                      id="email"
                      type="text"
                      class="input"
                      value=""
                    >
                    <span class="Validform_checktip">方便通知订单状态，非必填</span>
                  </dd>
                </dl>
                <dl class="form-group">
                  <dt>邮政编码：</dt>
                  <dd>
                    <input
                      name="post_code"
                      id="post_code"
                      type="txt"
                      class="input code"
                    >
                    <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                  </dd>
                </dl>
              </div> -->
              </el-form>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio-group v-model="radio1">
                    <el-radio :label="0">在线支付</el-radio>
                  </el-radio-group>

                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio-group v-model="radio2">
                    <el-radio :label="3">顺丰快递 <em>费用：20.00元</em> </el-radio>
                    <el-radio :label="6">圆通快递 <em>费用：20.00元</em> </el-radio>
                    <el-radio :label="9">百世快递 <em>费用：20.00元</em> </el-radio>
                  </el-radio-group>
                  <!-- <label>
                    <input
                      name="express_id"
                      type="radio"
                      onclick="freightAmountTotal(this);"
                      value="1"
                      datatype="*"
                      sucmsg=" "
                    >
                    <input
                      name="express_price"
                      type="hidden"
                      value="20.00"
                    >顺丰快递
                    <em>费用：20.00元</em>
                    <span class="Validform_checktip"></span>
                  </label> -->
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table"
              >
                <tbody>
                  <tr>
                    <th
                      colspan="2"
                      align="left"
                    >商品信息</th>
                    <th
                      width="84"
                      align="left"
                    >单价</th>
                    <th
                      width="84"
                      align="center"
                    >购买数量</th>
                    <th
                      width="104"
                      align="left"
                    >金额(元)</th>
                  </tr>
                  <tr
                    v-for="(item, index) in goodsList"
                    :key="item.id"
                  >
                    <td width="68">
                      <a
                        target="_blank"
                        href="/goods/show-89.html"
                      >
                        <img
                          :src="item.img_url"
                          class="img"
                        >
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        href="/goods/show-89.html"
                      >{{ item.title }}}</a>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price}}
                      </span>
                    </td>
                    <td align="center">{{item.buyCount}}</td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price * item.buyCount}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea
                        name="message"
                        class="input"
                        style="height:35px;"
                      ></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label
                      id="goodsAmount"
                      class="price"
                    >2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label
                      id="expressFee"
                      class="price"
                    >0.00</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label
                      id="totalAmount"
                      class="price"
                    >2299.00</label>
                  </p>
                  <p class="btn-box">
                    <a
                      class="btn button"
                      href="/cart.html"
                    >返回购物车</a>
                    <a
                      id="btnSubmit"
                      class="btn submit"
                    >确认提交</a>
                  </p>
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
// 导入省市联动
import VDistpicker from "v-distpicker";
export default {
  name: "order",
  data: function() {
    // 验证手机号
    var mobile = (rule, value, callback) => {
      //  value为输入的手机号码
      //  console.log(value);
      if (!value) {
        return callback(new Error("请输入手机号码"));
      } else {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的手机号！"));
        }
      }
    };
    // 验证邮编
    var post_code = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮编"));
      } else {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮编！"));
        }
      }
    };
    // 验证邮箱
    var email = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮箱！"));
        }
      }
    };
    return {
      goodsList: [],
      ids: "",
      ruleForm: {
        accept_name: "",
        address: "",
        mobile: "",
        post_code: "",
        email: "",
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440000", value: "深圳市" },
          area: { code: "440000", value: "宝安区" }
        }
      },
      rules: {
        // 表单验证规则
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "你名字有那么长吗？",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "change" },
          {
            min: 3,
            message: "请输入详细地址，方便找到你",
            trigger: "change"
          }
        ],
        mobile: [{ validator: mobile, trigger: "change" }],
        post_code: [{ validator: post_code, trigger: "change" }],
        email: [{ validator: email, trigger: "change" }]
      },
      radio1: 0,
      radio2: 0
    };
  },
  methods: {
    selectedArea(val) {
      console.log(val);
      this.ruleForm.area = val;
    }
  },
  // creater(){ }
  beforeCreate() {
    // this.$axios.get('http://111.230.232.110:8899/site/account/islogin').then(res => {
    //     // console.log(res);
    //     if(res.data.code == "nologin"){
    //         this.$Message.warning('请先登录');
    //         setTimeout(()=>{
    //             this.$router.push('/index');
    //         },1000)
    //     }
    // })
  },
  created() {
    // console.log(this.$store);
    this.ids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(res => {
        // console.log(res);
        this.goodsList = res.data.message;
        res.data.message.forEach(v => {
          v.buyCount = this.$store.state.cartData[v.id];
          // 总商品数
          this.totalCount += v.buyCount;
          // 累加总金额
          this.totalPrice += v.sell_price * v.buyCount;
        });
      });
  },
  // 省市联动
  components: { VDistpicker }
};
</script>

<style >
</style>