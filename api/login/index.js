const router = require('koa-router')()
const axios = require('axios')
const {envData} = require('@/env')
const wxApi = require('@/api/wxapp/api')
const signToken = require('./signToken')
router.post('/wxapplogin', async ctx => {
  var code = ctx.request.body.code //微信小程序获取到的code
  if (code) {
    var data = {
      appid: envData.WX_APPID,
      secret: envData.WX_SECRET,
      grant_type: 'authorization_code',
      js_code: code
    }
    await axios({
      url: wxApi.code2Session.url,
      method: 'GET',
      params: data
    }).then(async res => {
      if (res.data.openid) {
        var token = signToken(res.data.openid, '7d')
        ctx.body = {
          code: 1,
          message: token
        }
      } else {
        throw {
          code: res.data.errcode,
          message: res.data.errmsg
        }
      }
    })
  } else {
    ctx.body = {
      code: 0,
      message: '身份信息缺失'
    }
  }
})

module.exports = router.routes()
