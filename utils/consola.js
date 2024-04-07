const { consola } = require('consola')
const dayjs = require('dayjs')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

function Consola(info, type = 'success') {
  consola[type](`${dayjs().format('YYYY/MM/DD HH:mm:ss')} ${info}`)
}

module.exports = { Consola }
