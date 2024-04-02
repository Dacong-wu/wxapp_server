const router = require('koa-router')()
const { putSignedUrl } = require('../../utils/bitiful')

router.get('/signed-url', async ctx => {
  let { Bucket, Key } = ctx.query
  let url = await putSignedUrl(Bucket, Key)
  ctx.body = url
})

module.exports = router.routes()
