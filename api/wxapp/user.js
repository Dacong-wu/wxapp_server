// 用户相关的接口

const router = require('koa-router')()
const query = require('@/config/mysql')

// 1.获取开始时间，没有返回null
router.get('/getbegindate', async ctx => {
  var sql = `SELECT  DATE_FORMAT(begin_date,'%Y/%m/%d') as begin_date  FROM user WHERE openid = '${ctx.userOpenid}'`
  var data = await query(sql)
  ctx.body = {
    code: 1,
    message: data[0].begin_date
  }
})

// 2.判断是否存在情侣关系
router.get('/haslover', async ctx => {
  var sql = `select lover_openid from user where openid = '${ctx.userOpenid}'`
  var d = await query(sql)
  ctx.body = {
    code: 1,
    message: d[0].lover_openid ? 1 : 0
  }
})

// 3.用户登录，存在则返回用户信息，不存在则插入用户信息
router.post('/login', async ctx => {
  var userOpenid = ctx.userOpenid
  var sql = `select name,avatar,openid,DATE_FORMAT(begin_date,'%Y/%m/%d') as begin_date from user where openid = '${userOpenid}'`
  var d = await query(sql)
  if (d.length > 0) {
    ctx.body = {
      code: 1,
      message: d[0]
    }
  } else {
    var sql2 = `insert into user(openid) values('${userOpenid}')`
    await query(sql2)
    ctx.body = {
      code: 1,
      message: {
        name: null,
        avatar: null,
        begin_date: null,
        openid: userOpenid
      }
    }
  }
})

// 4.获取情侣的信息
router.get('/getloverinfo', async ctx => {
  var userOpenid = ctx.userOpenid
  var sql = `select name,avatar from user where openid in (select lover_openid from user where openid = '${ctx.userOpenid}')`
  var d = await query(sql)
  ctx.body = {
    code: 1,
    message: d[0]
  }
})

// 5.根据Openid获取用户的信息
router.get('/getuserinfo', async ctx => {
  var openid = ctx.query.openid
  var sql = `select name,avatar from user where openid = '${openid}'`
  var d = await query(sql)
  ctx.body = {
    code: 1,
    message: d[0]??''
  }
})

// 6.添加情侣关系
router.post('/addlover', async ctx => {
  var openid = ctx.request.body.openid
  var lover_openid = ctx.userOpenid
  var sql = `update user set lover_openid = '${lover_openid}' where openid = '${openid}'`
  await query(sql)
  var sql1 = `insert into user(openid,lover_openid) VALUES('${lover_openid}','${openid}') ON DUPLICATE KEY UPDATE lover_openid='${openid}'`
  await query(sql1)
  var sql2 = `select begin_date from user where openid in ('${openid}','${lover_openid}')`
  var d = await query(sql2)
  if (d[0].begin_date && d[1].begin_date) {
    if (d[0].begin_date > d[1].begin_date) {
      var sql3 = `update user set begin_date = '${d[1].begin_date}' where openid in ('${openid}','${lover_openid}')`
      await query(sql3)
    } else {
      var sql3 = `update user set begin_date = '${d[0].begin_date}' where openid in ('${openid}','${lover_openid}')`
      await query(sql3)
    }
  } else if (d[0].begin_date) {
    var sql3 = `update user set begin_date = '${d[0].begin_date}' where openid in ('${openid}','${lover_openid}')`
    await query(sql3)
  } else if (d[1].begin_date) {
    var sql3 = `update user set begin_date = '${d[1].begin_date}' where openid in ('${openid}','${lover_openid}')`
    await query(sql3)
  }
  ctx.body={
    code:1,
    message:'成功加入'
  }
})

module.exports = router.routes()
