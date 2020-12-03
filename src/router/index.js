import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Article from '../views/article.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'article',
        component: Article
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next();
  } else {
    if (localStorage.getItem('token')) {
      return next();
    } else {
      return router.push('/login')
    }
  }
})

export default router
