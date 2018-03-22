import axios from 'axios'
import qs from 'qs'
import apis from '~/assets/apis'
import env from '~/env.config'
// import { Message } from 'element-ui'

// 默认配置
let baseURL = env.baseURL
let instance = axios.create({
  // baseURL: baseURL,
  // 请求数据修改
  transformRequest: [
    data => qs.stringify(data)
  ]
})

// 请求拦截
let url = ''
instance.interceptors.request.use(httpRequest => {
  url = apis[httpRequest.url]
  // 对于外部请求, 不添加前缀, 也不加token参数
  if (url.indexOf('http') === 0) {
    httpRequest.url = url
    return httpRequest
  }

  // if ( httpRequest.method === 'post' ) {
  //   ( httpRequest.data? httpRequest.data: (httpRequest.data={}) )
  //     .token = localStorage.getItem('token');
  // } else if ( httpRequest.method === 'get' ) {
  //   ( httpRequest.params?httpRequest.params:(httpRequest.params={}) )
  //   .token = localStorage.getItem('token');
  // }

  httpRequest.url = baseURL + url
  return httpRequest
})

// 响应拦截器
let respData, errorCode, message//, duration;
instance.interceptors.response.use(
  httpResponse => {
    respData = httpResponse.data
    errorCode = respData.errorCode
    message = ''
    // duration = 3000
    if (errorCode === 1050 || errorCode === 1052) {
      message = `<span style="line-height:32px;">${respData.message}</span>
      <button type="button" style="float:right;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
        <span>重新登录</span>
      </button>`
      // duration = 0;
    } else if (respData.state !== 1) {
      if (typeof respData === 'object') {
        message = respData.message
        // duration = 3000
      }
    }
    if (message) {
      showMessage( {type:'failure', text:message} );
      // throw message;
    }
    return respData
  },
  error => {
    showMessage( {type:'failure', text:error.toString()} );
    return { state:0, message:error.toString() }
  }
)

function showMessage(obj) {
  if ( typeof global._showMessageDialog === 'undefined' ) {
    return setTimeout(showMessage,150,obj);
  }
  global._showMessageDialog(obj)
}

export default instance
