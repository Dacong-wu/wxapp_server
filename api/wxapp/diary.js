//日记相关的接口，需要token

const router = require('koa-router')()
const query = require('@/config/mysql')
const { nanoid } = require('nanoid')

// 分页获取日记
router.get('/getdiarybypage', async ctx => {
  var page = (ctx.query.page ? ctx.query.page - 1 : 0) * 20
  let sql = `select * from content where create_user_openid in ('${ctx.userOpenid}','${ctx.loverOpenid}') order by create_date DESC limit ${page},20`
  var data = await query(sql)
  ctx.body = {
    code: 1,
    message: data
  }
})

// 添加日记
router.post('/adddiary', async ctx => {
  var id = nanoid(30)
  var create_user_openid = ctx.userOpenid
  var create_date = ctx.request.body.date
  var content = ctx.request.body.content
  var type = ctx.request.body.type
  if (create_date && content && type) {
    var sql = `insert into content (id,create_user_openid,create_date,content,type) values ('${id}','${create_user_openid}','${create_date}','${content}','${type}')`
    await query(sql)
    let sql2 = `select * from content where id = '${id}'`
    var d = await query(sql2)
    ctx.body = {
      code: 1,
      message: d[0]
    }
  } else {
    ctx.body = {
      code: 0,
      message: '添加失败'
    }
  }
})

// 获取日记总是
router.get('/getallnumber', async ctx => {
  var sql = `select count(id) as sum from content where create_user_openid in ('${ctx.userOpenid}','${ctx.loverOpenid}')`
  var d = await query(sql)
  ctx.body = {
    code: 1,
    message: d.length > 0 ? d[0].sum : 0
  }
})

// 更新日记
router.post('/updatediary', async ctx => {
  var id = ctx.request.body.id
  var create_date = ctx.request.body.date
  var content = ctx.request.body.content
  var type = ctx.request.body.type
  var sql = `update content set create_date = '${create_date}',content = '${content}',type='${type}' where id = '${id}'`
  await query(sql)
  ctx.body = {
    code: 1,
    message: '更新成功'
  }
})

module.exports = router.routes()
