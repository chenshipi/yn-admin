// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import './router/permission.js';
// import router from './router/permission.js'

// element-ui
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// vuex
import store from './store';

// api接口
import http from './api';

// 编辑器插件
import WangEditor from './components/yn-wangEditor/WangEditor';

// 拖拽插件
import Draggable from 'vuedraggable';

// css
// 静态样式
import 'static/css/index.css';
// 样式初始化
import './styles/index.scss';

// 字体图标
import 'static/iconfont/iconfont.css';

// 在最后引入App，使模版内样式可以覆盖
import App from './App';

// 注入模块
Vue.component('WangEditor', WangEditor);
Vue.component('Draggable', Draggable);

// 将api放入prototype
Vue.prototype.$http = http;

Vue.use(ElementUi);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
});
