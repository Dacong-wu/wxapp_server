require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const catchError = require('./middlewares/catchError')
const router = require('./router')
const { envData } = require('./env')
const { Consola } = require('./utils/consola')
const app = new Koa({ proxy: true })

app.listen(envData.BASE_PORT, '0.0.0.0', () => {
  Consola(`AppServer-${envData.BASE_PORT} Online 小程序服务🍀`)
})

app.use(bodyParser())
app.use(catchError)
app.use(router.routes())
app.use(router.allowedMethods())
