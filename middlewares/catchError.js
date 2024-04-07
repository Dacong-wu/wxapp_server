const log4j = require('../utils/log4j')
const parser = require('ua-parser-js')
const axios = require('axios')
const { envData } = require('../env')

module.exports = async (ctx, next) => {
  try {
    var begin = Date.now()
    await next()
    var end = `${Date.now() - begin}ms`
    logInfo(ctx, end)
  } catch (err) {
    var end = `${Date.now() - begin}ms`
    if (err.status === 401) {
      // 判断是否为token过期等问题
      logInfo(ctx, end)
      ctx.status = err.status
    } else {
      logError(ctx, end, err)
      let content = `/服务出错/${err.stack}?group=以后的路一起走&icon=https://picture.ll1025.cn/avatar/yaya-5.webp`
      await axios(`${envData.BARK_URL}${content}`)
      ctx.body = {
        code: 0,
        errcode: err.message ? err.message : ctx.url,
        message: '服务异常，请联系管理员'
      }
    }
  }
}

//记录日志信息
function logInfo(ctx, time) {
  let agent = getAgent(ctx.request.header[`user-agent`])
  let ip = ctx.ip
  let method = ctx.method
  let data = {
    host: ctx.host,
    url: ctx.url,
    body: ctx.request.body,
    agent
  }
  let info = formatInfo({ method, time, ip, data })
  log4j.info(info)
}

//记录错误日志信息
function logError(ctx, time, err) {
  let agent = getAgent(ctx.request.header[`user-agent`])
  let method = ctx.method
  let ip = ctx.ip
  let data = {
    host: ctx.host,
    url: ctx.url,
    err_message: err.message,
    err_stack: err.stack,
    body: ctx.request.body,
    agent
  }
  let info = formatInfo({ method, time, ip, data })
  log4j.error(info)
}

function getAgent(data) {
  var agent = parser(data)
  delete agent.device
  delete agent.cpu
  agent.browser.name ? '' : delete agent.browser
  agent.engine.name ? '' : delete agent.engine
  agent.os.name ? '' : delete agent.os
  return agent
}

function formatInfo(info) {
  const { method, time, ip, data } = info
  let logs = `\nMethod:${method}\n`
  logs += `Time:${time}\n`
  logs += `Ip:${ip}\n`
  const { host, url, body, agent, err_stack } = data
  logs += `Host:${host}\n`
  logs += `Url:${url}\n`
  logs += `Body:${JSON.stringify(body)}\n`
  logs += `Ua:${agent.ua}\n`
  logs += `Browser:${JSON.stringify(agent.browser)}\n`
  logs += `Engine:${JSON.stringify(agent.engine)}\n`
  logs += `Os:${JSON.stringify(agent.os)}\n`
  if (err_stack) {
    logs += `Err_stack:${err_stack}\n`
  }
  return logs
}
