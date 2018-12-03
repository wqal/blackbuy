import Vue from "vue";

import moment from "moment";
Vue.filter("shortTime", value => {
  return moment().format("YYYY - MM - DD");
  // return value.charAt(0).toUpperCase() + value.slice(1)
});
Vue.filter("shortTimePlus", value => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
  // return value.charAt(0).toUpperCase() + value.slice(1)
});
