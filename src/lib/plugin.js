import Vue from "vue";

// 导入element-ui框架
// import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
// Vue.use(ElementUI);

// Element-ui 按需载入
import {
  Button,
  Switch,
  Pagination,
  Carousel,
  CarouselItem,
  InputNumber,
  Input,
  Notification,
  MessageBox,
  Message,
  Form,
  FormItem,
  Radio,
  RadioGroup
} from "element-ui";

Vue.use(Button);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(InputNumber);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);

Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;

// 导入 iView 框架
// import iView from "iview";
import "iview/dist/styles/iview.css";
// Vue.use(VueRouter);
// Vue.use(iView);

// iView 按需加载
import { Affix, Page, BackTop } from "iview";
Vue.component("Affix", Affix);
Vue.component("Page", Page);
Vue.component("BackTop", BackTop);

// 引入放大镜组件 GitHub中的
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;
//让ajax携带cookie
axios.defaults.withCredentials = true;
// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
