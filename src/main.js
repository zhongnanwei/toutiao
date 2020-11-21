import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1. 导入组件库
import Vant, { Toast } from 'vant'
import axios from 'axios'
// 2. 引入组件 css 文件
import 'vant/lib/index.css'
// 3. 注册 vant ui 组件库的标签
Vue.use(Vant)
//绑定到原型，调用只需要this.$axios获取
Vue.prototype.$axios = axios
//设置基准路径
axios.defaults.baseURL = "http://localhost:3000"
//添加拦截器，再返回给页面
axios.interceptors.response.use(response => {
  const errCodePattern = /^4\d{2}$/;
  if (errCodePattern.test(res.data.statusCode)) {
    Toast.fail(res.data.message)
  } else {
    return response;
  }
}, error => {

  return Promise.
    eject(error);
});
Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

