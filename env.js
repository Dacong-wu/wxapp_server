const envInfo = {
  NODE_ENV: 'production', // 环境名称
  BASE_API: process.env.AZURE_BASE_API, // 基础域名
  BASE_PORT: process.env.AZURE_PORT, // 监听端口
  MYSQL_HOST: process.env.AZURE_MYSQL_HOST,
  MYSQL_USER: process.env.AZURE_MYSQL_USER, // mysql用户名
  MYSQL_PASS: process.env.AZURE_MYSQL_PASSWORD, // mysql密码
  MYSQL_DATABASE: process.env.AZURE_MYSQL_DATABASE,
  WX_APPID: process.env.AZURE_WX_APPID, // 小程序的appid
  WX_SECRET: process.env.AZURE_WX_SECRET, // 小程序的秘钥
  JWT_SECRET: process.env.AZURE_JWT_SECRET, // jwt的秘钥
  AES_SECRET: process.env.AZURE_AES_SECRET, // aes加密的秘钥
  SERVER_API: process.env.AZURE_SERVER_API, // 图库应用
  REDIS_URL: process.env.AZURE_REDIS_URL,
  DB_LINK: process.env.AZURE_DB_LINK
}

const envData = envInfo

module.exports = { envData }
