const jwt = require('jsonwebtoken')
const {envData} = require('../env')
const decrypt = require('../utils/aes').decrypt

module.exports = async (ctx, next) => {
  var token_verify = ctx.request.headers.token
  var userOpenid = verify(token_verify)
  if (userOpenid) {
    ctx.userOpenid = userOpenid
    await next()
  } else {
    ctx.status = 401
  }
}

function verify(token_verify) {
  try {
    var d = decrypt(
      jwt.verify(token_verify, envData.JWT_SECRET).data
    )
    return d
  } catch (err) {
    return false
  }
}
