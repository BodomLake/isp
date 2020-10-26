// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);
Vue.config.productionTip = false;

import store from "./store";

// 引入右键菜单插件（修改/node_modules\vue-contextmenujs/src/components/ContextMenu.vue文件中的
// <i :class=??>  改为 < a - icon : type >，以便适用于 AntVueUI的Icon组件的渲染）
import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);

// 引入Antd-Vue UI
import ant from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
Vue.use(ant);
// import { Icon } from "ant-design-vue";
// const MyICON = Icon.createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_2101872_qz0h3jvipu.js" // 在 iconfont.cn 上生成
// });
// console.log("Icon", MyICON);
// 引入可视化表格插件
// Vue.use(VueHighcharts)
// import VueHighcharts from 'highcharts'
import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue);
import MyIcon from "./components/MyIcon";
import DragVerify from "./components/DragVerify";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// import ResSplitPane from "vue-resize-split-pane";

Vue.component("my-icon", MyIcon);
Vue.component("dragVerify", DragVerify);
Vue.use(mavonEditor);
// Vue.component("rs-panes", ResSplitPane);
/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
