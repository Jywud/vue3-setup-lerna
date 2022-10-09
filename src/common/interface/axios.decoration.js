import axios from 'axios';
import { Notify, Dialog } from 'vant';
import URLSearchParams from 'url-search-params';
import { isZLB } from '../utils/env';
import { getPlatform } from '../utils/nativeBridge';

const POST = 'POST';
const GET = 'GET';
const HTTP_TIMEOUT = 10000;
let NotifyMethod;
let platform = getPlatform();
// let lastReq = null;
// 判断是否手机更改提示类型
NotifyMethod = Notify;

//基本配置
axios.defaults.timeout = HTTP_TIMEOUT;
axios.defaults.baseURL = '';

//修改响应数据
axios.defaults.transformRequest = [
  function (data, headers) {
    // 添加 Authorization 头信息
    // console.log(data)

    // Object.assign(headers, { 'token': window.localStorage.getItem("token")||'' });
    if (data === undefined) {
      return;
    }
    if (data instanceof FormData) {
      // if(ddLogin){
      //     let ret = '';
      //     ret = qs.stringify(data);
      //     return ret;
      // }else{
      return data;
      // }
    }
    if (data instanceof URLSearchParams) {
      return data;
    }

    if (!data.emulateJSON) {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
      for (let v in data) {
        data[v] == null ? (data[v] = '') : data[v];
      }
      return JSON.stringify(data);
    } else {
      delete data.emulateJSON;
    }
    // 处理请求体编码
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    let params = new URLSearchParams();
    Object.keys(data).forEach(function (key) {
      if (Object.prototype.toString.call(data[key]) === '[object Object]') {
        for (let [k, v] of Object.entries(data[key])) {
          params.append(`${key}[${k}]`, v);
        }
      } else if (Array.isArray(data[key])) {
        // 传arr时
        for (let v of data[key]) {
          params.append(key, v);
        }
      } else {
        params.append(key, data[key] == null ? ' ' : data[key]);
      }
    });
    return params.toString();
  }
];

// 在处理请求拦截它们
axios.interceptors.request.use(
  function (config, p) {
    config.headers['Cache-Control'] = `no-cache`;
    // 在发送请求之前做些什么
    // Message('数据加载中...')
    let token = window.localStorage.getItem('token') || '';
    config.headers.token = `${token}`;
    // 设置js运行环境
    // config.headers.platform = 'wechat';
    config.headers.platform = platform;
    return config;
  },
  function (error) {
    // 发送 request 前发生异常（可能是 自定义的 transformRequest、interceptors，request 信息不完整，甚至 axios 框架本身）
    console.log('[request error] ' + error);
    return Promise.reject(error);
  }
);

//响应拦截 错误时
function resInterceptors(error) {
  // console.log(error);
  if (error.response.status) {
    console.log(error.response.status);
    switch (error.response.status) {
      // 401: 未登录
      case 401:
        break;
      // 403 token过期
      case 403:
        NotifyMethod('登录过期，请重新登录');
        setTimeout(() => {
          location.href = localStorage.getItem('loginUrl');
        }, 2000);
        break;
      // 其他错误，直接抛出错误提示
      case 406:
        NotifyMethod('权限不足');
        break;
      case 500:
        // NotifyMethod("服务器错误");
        break;
      case 503:
        NotifyMethod('服务器繁忙');
        break;
      default:
        console.log('[response error] ' + error);
    }
    return Promise.reject(error.response);
  }
}

// 在响应之前拦截它们
axios.interceptors.response.use(function (response) {
  return response;
}, resInterceptors);

const api = ({ url, method = POST, params = {}, emulateJSON = false, timeout = false, successCallback, errorCallback }) => {
  let reqConf = { method, url };
  if (method === POST && emulateJSON) {
    params.emulateJSON = true;
  }
  if (method === GET) {
    params.timestamp = new Date().getTime();
  }

  reqConf[method === POST ? 'data' : 'params'] = params;
  if (timeout) {
    axios.defaults.timeout = 100000;
  }

  return axios(reqConf)
    .then(res => {
      // 业务级成功
      successCallback && successCallback(res.data);
      return Promise.resolve(res.data);
    })
    .catch(error => {
      if (error.res) {
        // 服务端异常（返回的 HTTP 状态码非 2xx）
        errorCallback && errorCallback(error.res);
      } else {
        // 客户端代码异常（request 预处理、 successCallback 执行报错）或 请求超时
        console.error('[Error]', error.message);
      }
      console.error(error.config);

      return Promise.reject(error);
    });
};

/**
 * @param
 * url {string} 请求资源路径
 * method  get/post
 * params 请求参数
 * emulateJSON true :request-header Content-Type: application/x-www-form-urlencoded;charset=UTF-8
 *             false :request-header Content-Type: application/json;charset=UTF-8
 */
const request = ({ url, method = POST, params = {}, emulateJSON = true, timeout = false, ...config }) => {
  let reqConf = { method, url, ...config };
  if (method === POST && emulateJSON) {
    params.emulateJSON = true;
  }
  if (method === GET) {
    params.timestamp = new Date().getTime();
  }

  reqConf[method === POST ? 'data' : 'params'] = params;
  if (timeout) {
    axios.defaults.timeout = 100000;
  }
  return new Promise((resolve, reject) => {
    axios(reqConf).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

// const upload = ({url, formData, successCallback, errorCallback}) => {
//   axios.post(url, formData)
//     .then(function (response) {
//       successCallback && successCallback(response.data);
//     })
//     .catch(function (error) {
//       if (error.response) {
//         // 服务端异常（返回的 HTTP 状态码非 2xx）
//         errorCallback && errorCallback(error.response);
//       } else {
//         // 客户端代码异常（request 预处理、 successCallback 执行报错）或 请求超时
//         console.error('[Error]', error.message);
//       }
//     });
// };

/**
 * upload 方式：POST Content-Type: mutipart/form-data
 * @param {*} url
 * @param {*} data
 */
const upload = (url, data) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//get封装
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
//delete封装
const deleteData = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * 请求方法: POST, Content-Type: JSON
 * @param {*} url
 * @param {*} data
 */
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

/**
 * 请求方法: POST, Content-Type: application/x-www-from-urlencoded
 * @param {*} url
 * @param {*} data
 */
const postForm = (url, data) => {
  return request({ url, params: data, emulateJSON: true });
};

//put封装
const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

/**
 * @desc download
 * @ params {  }
 */
const download = (url, params = {}, filename, onProgress) => {
  axios
    .request({
      url,
      method: GET,
      params,
      responseType: 'blob',
      onDownloadProgress: onProgress
    })
    .then(res => {
      // console.log(res);
      if (!(res.data instanceof Blob)) {
        Message({
          type: 'error',
          message: '下载失败'
        });
      } else {
        let blob = res.data;
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, file.fileName);
        } else {
          let aEle = document.createElement('a');
          aEle.href = window.URL.createObjectURL(blob);
          if (!filename) {
            // 没传文件名，就用后台的filename， 后台也没有传就。。。。
            let res_header = res.headers['content-disposition'];
            if (res_header.indexOf('filename=') !== -1) {
              filename = res_header.split('filename=')[1];
            } else {
              filename = res_header.split('fileName=')[1];
            }
            filename = decodeURIComponent(filename || '');
          }
          aEle.download = filename;
          aEle.click();
          window.URL.revokeObjectURL(aEle.href);
        }
      }
    });
};

export default {
  api,
  get,
  post,
  postForm,
  put,
  request,
  upload,
  download,
  deleteData
};
