const envInfo = {
  NODE_ENV: 'production', // 环境名称
  BASE_API: process.env.AZURE_BASE_API, // 基础域名
  BASE_PORT: process.env.AZURE_PORT, // 监听端口
  WX_APPID: process.env.AZURE_WX_APPID, // 小程序的appid
  WX_SECRET: process.env.AZURE_WX_SECRET, // 小程序的秘钥
  JWT_SECRET: process.env.AZURE_JWT_SECRET, // jwt的秘钥
  AES_SECRET: process.env.AZURE_AES_SECRET, // aes加密的秘钥
  SERVER_API: process.env.AZURE_SERVER_API, // 图库应用
  REDIS_URL: process.env.AZURE_REDIS_URL,  // render中redis地址
  DB_LINK: process.env.AZURE_DB_LINK, // 使用mongodb官方的地址
  S3_ACCESS_KEY_ID:process.env.S3_ACCESS_KEY_ID, // 缤纷云的  keyId
  S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY // 缤纷云的 key
}

const envData = envInfo

module.exports = { envData }
