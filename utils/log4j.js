// 记录日志功能
// 普通日志保留近7天数据，滚动时间以天为单位
// 错误日志保留近30天数据，滚动时间以天为单位

const log4j = require('log4js')

// log4j配置
log4j.configure({
  pm2: true,
  appenders: {
    console: {
      type: 'console'
    },
    info: {
      type: 'dateFile',
      filename: 'logs/info/info.log',
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      numBackups: 7
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error/error.log',
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      numBackups: 30
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'ALL'
    },
    info: {
      appenders: ['info'],
      level: 'info'
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error'
    }
  }
})

/**
 * 日志输出 level为info
 * @param { string } content
 */
exports.info = content => {
  let logger = log4j.getLogger('info')
  logger.info(content)
}

/**
 * 日志输出 level为error
 * @param { string } content
 */
exports.error = content => {
  let logger = log4j.getLogger('error')
  logger.error(content)
}
