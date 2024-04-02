const router = require('koa-router')()
const login = require('@/api/login/index')
const wxapp = require('@/api/wxapp/index')
const upload = require('@/api/upload/index')
const verifytoken = require('@/middlewares/verifyToken')

router.use('/login', login)
router.use(verifytoken)
router.use('/upload', upload)
router.use('/wxapp', wxapp)

module.exports = router
