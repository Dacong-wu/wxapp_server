// 用户相关的接口
const router = require('koa-router')()
const { UserModel } = require('../../config/mongodb')

// 1.获取开始时间，没有返回null
router.get('/getbegindate', async ctx => {
  const result = await UserModel.findOne({ openid: ctx.userOpenid }, { begin_date: '$begin_date' })
  ctx.body = {
    code: 1,
    message: result?.begin_date
  }
})

// 2.判断是否存在情侣关系
router.get('/haslover', async ctx => {
  const user = await UserModel.findOne({ openid: ctx.userOpenid }, { lover_openid: 1 })
  ctx.body = {
    code: 1,
    message: user?.lover_openid ? 1 : 0
  }
})

// 3.用户登录，存在则返回用户信息，不存在则插入用户信息
router.post('/login', async ctx => {
  let user = await UserModel.findOne({ openid: ctx.userOpenid }).select('name avatar openid begin_date')
  if (user) {
    ctx.body = {
      code: 1,
      message: user
    }
  } else {
    await UserModel.create({ openid: ctx.userOpenid })
    ctx.body = {
      code: 1,
      message: {
        name: null,
        avatar: null,
        begin_date: null,
        openid: ctx.userOpenid
      }
    }
  }
})

// 4.获取情侣的信息
router.get('/getloverinfo', async ctx => {
  let loverUser = await UserModel.findOne({ openid: ctx.userOpenid }).select('lover_openid')
  let userInfo = await UserModel.findOne({ openid: loverUser?.lover_openid }).select('name avatar')
  ctx.body = {
    code: 1,
    message: userInfo
  }
})

// 5.根据Openid获取用户的信息
router.get('/getuserinfo', async ctx => {
  var openid = ctx.query.openid
  let userInfo = await UserModel.findOne({ openid }).select('name avatar')
  ctx.body = {
    code: 1,
    message: userInfo
  }
})

// 6.添加情侣关系
router.post('/addlover', async ctx => {
  var openid = ctx.request.body.openid
  var lover_openid = ctx.userOpenid
  await UserModel.findOneAndUpdate({ openid }, { lover_openid })
  await UserModel.findOneAndUpdate({ openid: lover_openid }, { $set: { lover_openid: openid, openid: lover_openid } }, { upsert: true })
  const result = await UserModel.find({ openid: { $in: [openid, lover_openid] } }, { begin_date: 1 }).lean()
  if (result[0].begin_date && result[1].begin_date) {
    if (result[0].begin_date > result[1].begin_date) {
      await UserModel.updateMany({ openid: { $in: [openid, lover_openid] } }, { $set: { begin_date: result[1].begin_date } })
    } else {
      await UserModel.updateMany({ openid: { $in: [openid, lover_openid] } }, { $set: { begin_date: result[0].begin_date } })
    }
  } else if (result[0].begin_date) {
    await UserModel.updateMany({ openid: { $in: [openid, lover_openid] } }, { $set: { begin_date: result[0].begin_date } })
  } else if (result[1].begin_date) {
    await UserModel.updateMany({ openid: { $in: [openid, lover_openid] } }, { $set: { begin_date: result[1].begin_date } })
  }
  ctx.body = {
    code: 1,
    message: '成功加入'
  }
})

// 7.设置头像昵称
router.post('/update-avatar', async ctx => {
  let { name, avatar } = ctx.request.body
  let openid = ctx.request.body.openid
  if (name && avatar) {
    await UserModel.findOneAndUpdate({ openid }, { name, avatar })
  } else {
    ctx.body = {
      code: 0,
      message: '缺少昵称或头像信息'
    }
  }
})

module.exports = router.routes()
