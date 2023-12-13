const router = require('koa-router')()
const axios = require('axios')
const getData = require('@/middlewares/getData')
const { envData } = require('@/env')

router.post('/avatar', getData, async ctx => {
  var req = ctx.req
  var p = new Promise((resolve, reject) => {
    axios({
      url: `${envData.SERVER_API}/upload/avatar`,
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type']
      },
      data: ctx.requestBody
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  var info = await p
  ctx.body = info
})

module.exports = router.routes()
