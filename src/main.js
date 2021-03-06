import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1. 导入组件库
import Vant, { Toast } from 'vant'
import { Dialog } from 'vant'
import { ActionSheet } from 'vant';
import axios from 'axios'
import { Tab, Tabs } from 'vant';
// 2. 引入组件 css 文件
import 'vant/lib/index.css'
// 3. 注册 vant ui 组件库的标签
Vue.use(Vant)
// 全局注册
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(Tab);
Vue.use(Tabs);
//绑定到原型，调用只需要this.$axios获取
Vue.prototype.$axios = axios
//设置基准路径
axios.defaults.baseURL = "http://localhost:3000"
//添加拦截器，再返回给页面
axios.interceptors.response.use(response => {
  const errCodePattern = /^4\d{2}$/;
  if (errCodePattern.test(response.data.statusCode)) {
    Toast.fail(response.data.message)
  }
  //个人信息拦截器
  if (response.data.message == '用户信息验证失败') {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.replace('/login');
    Toast.fail('信息获取出错，请重新登录');
  }
  return response;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.request.use(config => {
  if (!config.headers.Authorization && localStorage.getItem('token'))
    config.headers.Authorization = localStorage.getItem('token');
  return config;
});

Vue.filter('imgUrl', (url) => {
  if (url.includes("http")) {
    return url;
  } else {
    return axios.defaults.baseURL + url;
  }
})
Vue.config.productionTip = false;
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

