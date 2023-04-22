//数据库相关的代码
const mysql = require('mysql2')
const {envData} = require('@/env')

const config = {
  host: 'localhost',
  user: envData.MYSQL_USER,
  port: '3306',
  password: envData.MYSQL_PASS,
  database: 'wx_cloud',
  // timezone: '+08:00',
  dateStrings: true
}
const pool = mysql.createPool(config)
const query = function (sql) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
        pool.releaseConnection(conn)
      }
    })
  })
}
module.exports = query
