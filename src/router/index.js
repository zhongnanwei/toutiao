import Vue from 'vue'
import VueRouter from 'vue-router'
//@代表src目录
import Home from '@/views/Home.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import EditPage from '@/views/editpage.vue'
import Personal from '@/views/personal.vue'
import Banner from '@/views/banner.vue'
import Focus from '@/views/focus.vue'
import Search from '@/views/search.vue'
import Star from '@/views/star.vue'
import PostDetail from '@/views/post_detail.vue'
import PostComment from '@/views/post_comment.vue'
import Test from '@/views/Test.vue'
import MyComment from '@/views/mycomment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal,
    // meta: { needAuth: true }
  },
  {
    path: '/editpage',
    name: 'EditPage',
    component: EditPage
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Banner
  },
  {
    path: '/focus',
    name: 'Focus',
    component: Focus
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/star',
    name: 'Star',
    component: Star
  },
  {
    path: '/post_detail/:id',
    name: 'PostDetail',
    component: PostDetail
  },
  {
    path: '/post_comment/:id',
    name: 'PostComment',
    component: PostComment
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/my_comment',
    name: 'MyComment',
    component: MyComment
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //1.对象存储法
  //2.路由meta设置判断方法 if(to.meta.needAuth)
  const pageAuth = ['/personal', '/editpage', '/focus', '/star', '/my_comment'];
  if (pageAuth.includes(to.path)) {
    if (localStorage.getItem('token')) {
      return next();
    } else {
      return router.push('/login').catch(err => { })
    }
  }
  next();
})

export default router
