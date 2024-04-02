const crypto = require('crypto')
const { envData } = require('../env')

let secret = envData.AES_SECRET

// 生成符合规范长度的密钥
function genkey(secret, length = 32) {
  return crypto
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, length)
}
// 加密字符串
function encryptByAes256(content, secretkey, iv) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    genkey(secretkey),
    genkey(iv, 16)
  )
  let enc = cipher.update(content, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}
// 解密字符串
function decryptByAes256(content, secretkey, iv) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    genkey(secretkey),
    genkey(iv, 16)
  )
  let dec = decipher.update(content, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

//aes加密
const encrypt = (data) => {
  try {
    var en_data = encryptByAes256(JSON.stringify(data), secret, secret)
    return en_data
  } catch (err) {
    err.title = err.title ? err.title : 'aes加密'
    throw err
  }
}
//aes解密
const decrypt = (data) => {
  try {
    const de_data = decryptByAes256(data, secret, secret)
    return JSON.parse(de_data)
  } catch (err) {
    err.title = err.title ? err.title : 'aes解密'
    throw err
  }
}

module.exports = {
  encrypt,
  decrypt,
}
