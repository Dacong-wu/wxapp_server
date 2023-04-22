const router = require('koa-router')()
const user = require('./user')
const diary = require('./diary')
const home = require('./home')
const query = require('@/config/mysql')
const redis = require('@/config/redis')

router.use(async (ctx, next) => {
  var loverOpenid = await redis.get('loverOpenid' + ctx.userOpenid)
  var notHave = '暂无'
  if (loverOpenid && loverOpenid != notHave) {
    ctx.loverOpenid = loverOpenid
  } else {
    var sql = `select lover_openid from user where openid = '${ctx.userOpenid}'`
    var data = await query(sql)
    if (data.length > 0 && data[0].lover_openid) {
      redis.set('loverOpenid' + ctx.userOpenid, data[0].lover_openid, 86400 * 9) // 保存恋人id，保存时间为9天
      ctx.loverOpenid = data[0].lover_openid
    } else {
      redis.set('loverOpenid' + ctx.userOpenid, notHave, 86400) //保存一天，如果添加邀请恋人成功后，需要更新这条redis数据
    }
  }
  await next()
})

router.use('/home', home)
router.use('/user', user)
router.use('/diary', diary)
module.exports = router.routes()
