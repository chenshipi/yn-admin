import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

// import Login from '@/views/login/Login'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   path: '/',
    //   component: Layout
    // },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: { title: '首页', icon: '' },
          component: () => import('@/views/home/Home')
        }
      ]
    }
  ]
})
