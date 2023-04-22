const router = require('koa-router')()
const axios = require('axios')
const {envData} = require('@/env')

router.post('/avatar', async ctx => {
  var req = ctx.req
  var p = new Promise((resolve, reject) => {
    var buffers = []
    req.on('data', chunk => {
      buffers.push(chunk)
    })
    req.on('end', async () => {
      let requestBody = Buffer.concat(buffers)
      axios({
        url: `${envData.SERVER_API}/upload/avatar`,
        method: 'POST',
        headers: {
          'content-type': req.headers['content-type'],
          token: `${envData.SERVER_API_TOKEN}`
        },
        data: requestBody
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
    req.on('error', function () {
      console.log('err')
    })
  })
  var info = await p
  ctx.body = info
})

module.exports = router.routes()
