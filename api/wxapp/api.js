// 微信端的接口

var baseURL = 'https://api.weixin.qq.com/'
const wxApi = {
  getAccessToken: {
    url: `${baseURL}cgi-bin/token`,
    name: '获取接口调用凭据',
    method: 'GET',
    website:
      'https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html'
  },
  code2Session: {
    url: `${baseURL}sns/jscode2session`,
    name: '小程序登录',
    method: 'GET',
    website:
      'https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html'
  }
}

module.exports = wxApi
