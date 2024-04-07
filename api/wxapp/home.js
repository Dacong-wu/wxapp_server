// 首页相关的接口

const router = require('koa-router')()
const { PublicModel, MemoryModel } = require('../../config/mongodb')

// 获取首页banner图
router.get('/getbanner', async ctx => {
  const results = await PublicModel.find(
    { is_del: 0, type: 1 } // 查询条件
  )
    .sort({ create_time: -1 }) // 排序，按 create_time 降序排列
    .exec()
  let data = results.map(item => {
    return item.content
  })
  ctx.body = {
    code: 1,
    message: data
  }
})

// 获取纪念图片列表
router.get('/getmemory', async ctx => {
  const data = await PublicModel.find(
    { is_del: 0, type: 2 }, // 查询条件
    { banner: '$content' } // 投影，指定返回的字段和字段重命名
  )
    .sort({ create_time: -1 }) // 排序，按 create_time 降序排列
    .exec()
  ctx.body = {
    code: 1,
    message: data
  }
})

// 获取纪念的详情
router.get('/getmemoryinfo', async ctx => {
  var id = ctx.query.id ? ctx.query.id : ''
  const results = await MemoryModel.findById(id).lean()
  results.memory_id = results._id
  ctx.body = {
    code: 1,
    message: results
  }
})
module.exports = router.routes()
