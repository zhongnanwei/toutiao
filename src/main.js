import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
// 引入 ui 库
import ElementUI from 'element-ui';
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';
//注册组件库
Vue.use(ElementUI);
// 绑定到原型
Vue.prototype.$axios = axios;
//设置默认的 api 域名基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
