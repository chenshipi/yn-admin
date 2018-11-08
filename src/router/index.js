import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'
import BlankViews from '@/views'

// import Login from '@/views/login/Login'

Vue.use(Router)

export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home'
  // },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/Login')
  },
  {
    path: '/lock',
    name: '锁屏页',
    hidden: true,
    component: () => import('@/views/common/lock')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-mobile-phone' },
        component: () => import('@/views/home/Home')
      }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/answerActivity',
    meta: { title: '营销管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'answerActivity',
        redirect: 'answerActivity/ActivityList',
        meta: { title: '答题活动' },
        component: BlankViews,
        children: [
          {
            path: 'activityList',
            name: 'ActivityList',
            component: () => import('@/views/marketing/answer/ActivityList')
          },
          {
            path: 'add',
            meta: { title: '新建活动' },
            redirect: 'add/addActivity',
            component: BlankViews,
            children: [
              {
                path: 'addActivity',
                name: 'AddActivity',
                component: () => import('@/views/marketing/answer/addActivity/AddActivity')
              },
              {
                path: 'addTopic',
                name: 'AddTopic',
                meta: { title: '添加题目' },
                component: () => import('@/views/marketing/answer/addActivity/AddTopic')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/updatePassword',
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'updatePassword',
        name: 'UpdatePassword',
        meta: { title: '修改密码' },
        component: () => import('@/views/system/UpdatePwd')
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        meta: { title: '系统日志' },
        component: () => import('@/views/system/SystemLog')
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
