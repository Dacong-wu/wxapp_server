const envInfo = {
  // 开发环境
  dev: {
    NODE_ENV: '', // 环境名称
    BASE_API: '', // 基础域名
    BASE_PORT: '', // 监听端口
    MYSQL_USER: '', // mysql用户名
    MYSQL_PASS: '', // mysql密码
    REDIS_PASS: '', // redis密码
    WX_APPID: '', // 小程序的appid
    WX_SECRET: '', // 小程序的秘钥
    JWT_SECRET: '', // jwt的秘钥
    AES_SECRET: '', // aes加密的秘钥
    SERVER_API: '', // 图库应用
    SERVER_API_TOKEN: '' // 图库的验证码
  },
  // 生产环境
  pro: {
    NODE_ENV: '', // 环境名称
    BASE_API: '', // 基础域名
    BASE_PORT: '', // 监听端口
    MYSQL_USER: '', // mysql用户名
    MYSQL_PASS: '', // mysql密码
    REDIS_PASS: '', // redis密码
    WX_APPID: '', // 小程序的appid
    WX_SECRET: '', // 小程序的秘钥
    JWT_SECRET: '', // jwt的秘钥
    AES_SECRET: '', // aes加密的秘钥
    SERVER_API: '', // 图库应用
    SERVER_API_TOKEN: '' // 图库的验证码
  }
}

const envData = envInfo[process.env.NODE_ENV]

module.exports = { envData }
