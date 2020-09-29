import axios from "axios";
import {Message} from "element-ui";

//响应拦截器
axios.interceptors.response.use(success => {
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error({
      message: success.data.msg
    });
    return;
  }
  return success.data;
}, error => {
  var status = error.response.status;
  if (status === 504 || status === 404) {
    Message.error({message: '服务器异常！'});
  } else if (status === 403) {
    Message.error({message: '权限不足！'});
  } else if (status === 401) {
    Message.error({message: '尚未登陆！'});
  } else {
    if (error.response.msg) {
      Message.error({message: error.response.msg})
    } else {
      Message.error({message: '未知错误！'})
    }
  }
  return;
})

let base = "";

export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function (data) {
        let ret = '';
        for (let i in data) {
          ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
