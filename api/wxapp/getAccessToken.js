const schedule = require('node-schedule')
const redis = require('../../config/redis')
const axios = require('axios')
const { envData } = require('../../env')
const wxApi = require('./api')

const getAccessToken = async function () {
  var data = {
    grant_type: 'client_credential',
    appid: envData.WX_APPID,
    secret: envData.WX_SECRET
  }
  await axios({
    url: wxApi.getAccessToken.url,
    method: 'GET',
    params: data
  })
    .then(res => {
      let ttl = res.data.expires_in - 500
      redis.set('access_token', res.data.access_token, ttl)
    })
    .catch(e => {
      console.log(`%c${e}`, 'color:red')
    })
}
// 定时刷新access_token
// 只在生产环境获取(production)，防止开发环境破坏生产环境平衡
if (envData.NODE_ENV == 'production') {
  getAccessToken()
  schedule.scheduleJob('0 0 * * * *', async () => {
    //                  s m h d m w
    await getAccessToken()
  })
}
