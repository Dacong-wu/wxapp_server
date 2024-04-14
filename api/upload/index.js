const router = require('koa-router')()
const {
  getPutObjectSignedUrl,
  getGetObjectSignedUrl,
} = require('../../utils/bitiful')

router.get('/signed-url', async ctx => {
  let { Bucket, Key } = ctx.query
  let url = await getPutObjectSignedUrl(Bucket, Key)
  ctx.body = {
    code: 1,
    message: url,
  }
})

router.get('/signed-url-v1', async ctx => {
  let { Bucket, Key } = ctx.query
  let url = await getPutObjectSignedUrl(Bucket, Key)
  let host = 'https://bitiful.ll1025.cn/'
  switch (Bucket) {
    case 'wxapp-public':
      host = 'https://bitiful.ll1025.cn/'
      break
  }
  ctx.body = {
    code: 1,
    message: { host, url },
  }
})

router.get('/signed-url-and-visit', async ctx => {
  let { Bucket, Key } = ctx.query
  let uploadUrl = await getPutObjectSignedUrl(Bucket, Key)
  let visitUrl = await getGetObjectSignedUrl(Bucket, Key)
  ctx.body = {
    code: 1,
    message: { uploadUrl, visitUrl },
  }
})

module.exports = router.routes()
