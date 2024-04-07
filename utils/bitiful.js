const { envData } = require('../env')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3Client = new S3Client({
  region: 'cn-east-1', //桶信息中的服务可用区
  endpoint: 'https://s3.bitiful.net', //桶信息中的服务端点
  credentials: {
    accessKeyId: envData.S3_ACCESS_KEY_ID, //AccessKeyId
    secretAccessKey: envData.S3_SECRET_ACCESS_KEY //AccessKey
  }
})

function getPutObjectSignedUrl(Bucket, Key) {
  const putCmd = new PutObjectCommand({
    Bucket, //桶名称
    Key //图片的key，avatar/ 就是把它放到avatar文件夹下
  })
  //获取预签名链接
  return new Promise((resolve, rejects) => {
    getSignedUrl(s3Client, putCmd, { expiresIn: 3600 })
      .then(url => {
        resolve(url)
      })
      .catch(err => {
        rejects(err)
      })
  })
}

function getGetObjectSignedUrl(Bucket, Key) {
  const putCmd = new GetObjectCommand({
    Bucket, //桶名称
    Key //图片的key，avatar/ 就是把它放到avatar文件夹下
  })
  //获取访问签名链接
  return new Promise((resolve, rejects) => {
    getSignedUrl(s3Client, putCmd, { expiresIn: 3600 })
      .then(url => {
        resolve(url)
      })
      .catch(err => {
        rejects(err)
      })
  })
}

module.exports = { getPutObjectSignedUrl, getGetObjectSignedUrl }
