// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import './router/permission.js'
// import router from './router/permission.js'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

// css
import '@/styles/index.scss'

// 字体图标
import 'static/iconfont/iconfont.css'

// 在最后引入App，使模版内样式可以覆盖
import App from './App'

Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
