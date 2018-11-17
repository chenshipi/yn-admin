import axios from 'axios';
import { Message } from 'element-ui';

// 创建实例
const service = axios.create({
  baseURL: process.env.BASE_API, // 使用代理
  timeout: 5000, // 请求超时时间
  method: 'post'
});

// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.withCredentials = false;
    return config;
  },
  error => {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.resolve(error.response);
  }
);

// 用一个新的promise再包一层处理抛出的错误
const fetch = function (config) {
  return new Promise((resolve, reject) => {
    service(config)
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        console.log('then', res);
        resolve(res);
      })
      .catch(res => {
        console.log(res);
        reject(res);
      });
  });
};

// 检查请求状态
function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  console.log('checkStatus', response);
  var status = response.status;
  if (response && (status === 200 || status === 304)) {
    return response;
  }
  // 异常状态下，把错误信息返回去
  if (!response) {
    return {
      // 定义错误信息
      status: -1,
      message: '无法连接服务器，请稍后再试'
    };
  } else {
    return {
      status: status,
      message: '服务器返回出错'
    };
  }
}

export default fetch;
