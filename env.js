const envInfo = {
  NODE_ENV: 'production', // 环境名称
  BASE_API: process.env.BASE_API, // 基础域名
  BASE_PORT: process.env.PORT, // 监听端口
  WX_APPID: process.env.WX_APPID, // 小程序的appid
  WX_SECRET: process.env.WX_SECRET, // 小程序的秘钥
  JWT_SECRET: process.env.JWT_SECRET, // jwt的秘钥
  AES_SECRET: process.env.AES_SECRET, // aes加密的秘钥
  SERVER_API: process.env.SERVER_API, // 图库应用
  REDIS_PASS: process.env.AZURE_REDIS_PASS, // redis密码
  REDIS_HOST: process.env.REDIS_HOST, // redis主机
  DB_LINK: process.env.DB_LINK, // 使用mongodb官方的地址
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID, // 缤纷云的  keyId
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY, // 缤纷云的 key
  BARK_URL: process.env.BARK_URL //bark通知地址
}

const envData = envInfo

module.exports = { envData }
