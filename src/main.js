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
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false

Vue.filter('fixImgUrl', (oldUrl) => {
  if (oldUrl.includes('http')) {
    return oldUrl
  } else {
    return axios.defaults.baseURL + oldUrl
  }
})


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
