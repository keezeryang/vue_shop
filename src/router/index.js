import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './../components/Login.vue'
import Home from './../components/Home.vue'
import Welcome from './../components/Welcome.vue'
import Users from './../components/user/Users.vue'
import Reports from './../components/report/Reports.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [

      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/reports', component: Reports }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next next()放行 next('login')强制跳转

  if (to.path === '/login') return next()
  // 非登录页操作
  const token = window.sessionStorage.getItem('token')
  if (token) {
    // 有token表示已经登录了，直接放行
    next()
  } else {
    // 没有token表示没有登录，跳到登录页
    next('/login')
  }
})

export default router
