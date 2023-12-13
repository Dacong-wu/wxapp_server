module.exports = async (ctx, next) => {
  var req = ctx.req
  var buffers = []
  const requestBody = new Promise((resolve, reject) => {
    req.on('data', chunk => {
      buffers.push(chunk)
    })
    req.on('end', async () => {
      resolve(Buffer.concat(buffers))
    })
    req.on('error', function () {
      reject(new Error('读取data错误'))
    })
  })
  ctx.requestBody = await requestBody
  await next()
}
