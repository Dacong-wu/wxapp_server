require('module-alias/register')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const catchError = require('@/middlewares/catchError')
const router = require('@/router')
const {envData} = require('@/env')
// const getAccessToken = require('./api/wxapp/getAccessToken')
const app = new Koa({ proxy: true })

app.listen(envData.BASE_PORT, '0.0.0.0', () => {
  console.log('AppServer Online 小程序服务🍀')
})
app.use(bodyParser())
app.use(catchError)
app.use(router.routes())
app.use(router.allowedMethods())
// app.use(ctx => {
//   ctx.redirect('https://ll1025.cn')
// })
