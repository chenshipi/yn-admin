import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式

import Router from './';

Router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

Router.afterEach(() => {
  NProgress.done();
});

export default Router;
