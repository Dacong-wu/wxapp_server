const router = require('koa-router')()
const { getPutObjectSignedUrl } = require('../../utils/bitiful')

router.get('/signed-url', async ctx => {
  let { Bucket, Key } = ctx.query
  let url = await getPutObjectSignedUrl(Bucket, Key)
  ctx.body = url
})

module.exports = router.routes()
