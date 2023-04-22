const jwt = require('jsonwebtoken')
const {envData} = require('@/env')
const encrypt = require('@/utils/aes').encrypt

module.exports = function (data, expiration_time) {
  var payload = {
    data: encrypt(data)
  }
  var secret = envData.JWT_SECRET
  return jwt.sign(payload, secret, {
    expiresIn: expiration_time
  })
}
