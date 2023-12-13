//数据库相关的代码
const mysql = require('mysql2')
const {envData} = require('@/env')

const config = {
  host: process.env.AZURE_MYSQL_HOST,
  user: envData.MYSQL_USER,
  port: Number(process.env.AZURE_MYSQL_PORT),
  password: envData.MYSQL_PASS,
  database: process.env.AZURE_MYSQL_DATABASE,
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
