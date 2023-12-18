//日记相关的接口，需要token

const router = require('koa-router')()
const { ContentModel } = require('@/config/mongodb')

// 分页获取日记
router.get('/getdiarybypage', async ctx => {
  let page = (ctx.query.page ? ctx.query.page - 1 : 0) * 20
  let data = await ContentModel.find({
    create_user_openid: { $in: [ctx.userOpenid, ctx.loverOpenid] }
  })
    .sort({ create_date: -1 })
    .skip(page * 20)
    .limit(20)
  ctx.body = {
    code: 1,
    message: data
  }
})

// 添加日记
router.post('/adddiary', async ctx => {
  var create_user_openid = ctx.userOpenid
  var create_date = ctx.request.body.date
  var content = ctx.request.body.content
  var type = ctx.request.body.type
  if (create_date && content && type) {
    let data = await ContentModel.create({
      create_user_openid,
      create_date,
      content,
      type
    })
    ctx.body = {
      code: 1,
      message: data
    }
  } else {
    ctx.body = {
      code: 0,
      message: '添加失败'
    }
  }
})

// 获取日记总数
router.get('/getallnumber', async ctx => {
  const count = await ContentModel.countDocuments({
    create_user_openid: { $in: [ctx.userOpenid, ctx.loverOpenid] }
  })
  ctx.body = {
    code: 1,
    message: count
  }
})

// 更新日记
router.post('/updatediary', async ctx => {
  var id = ctx.request.body.id
  var create_date = ctx.request.body.date
  var content = ctx.request.body.content
  var type = ctx.request.body.type
  await ContentModel.updateOne(
    { _id, id }, // 条件，这里假设使用 id 作为条件
    {
      $set: {
        create_date,
        content,
        type
      }
    }
  )
  ctx.body = {
    code: 1,
    message: '更新成功'
  }
})

module.exports = router.routes()
