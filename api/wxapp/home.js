// 首页相关的接口

const router = require('koa-router')()
const query = require('@/config/mysql')

// 获取首页banner图
router.get('/getbanner', async ctx => {
  var sql = `SELECT content as url FROM public WHERE is_del = 0  and type = 1 order by create_time DESC`
  var data = await query(sql)
  var arr = []
  data.forEach(element => {
    arr.push(element.url)
  })
  ctx.body = {
    code: 1,
    message: arr
  }
})

// 获取纪念图片列表
router.get('/getmemory', async ctx => {
  var sql = `select id,content as banner from public where is_del = 0 and type = 2 order by create_time DESC`
  var data = await query(sql)
  ctx.body = {
    code: 1,
    message: data
  }
})

// 获取纪念的详情
router.get('/getmemoryinfo', async ctx => {
  var id = ctx.query.id ? ctx.query.id : ''
  var sql = `select * from memory_page where memory_id = '${id}'`
  var data = await query(sql)
  ctx.body = {
    code: 1,
    message: data[0]
  }
})
module.exports = router.routes()
