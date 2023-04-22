### 背景

微信小程序原生云开发，官方调整运营策略，以前的免费额度通通取消，最低付费为19.9元/月😯，所以打算自建服务

### 项目技术栈和选用模块

技术栈：Koa2

选用模块：

```
koa-router : koa 中处理路由
koa-bodyparser : koa 中处理post请求
dayjs : 格式化时间
log4js : 记录日志
node-schedule : 定时执行
axios : 网络请求
jsonwebtoken : 生成token
cross-env : 切换node环境
image-size : 获取图片的宽高
nanoid : 获取随机字符id
mysql2 : 连接数据库
mime-types : 获取文件类型
ioredis : 操作redis
module-alias : @代替根路径
nodemon : 热更新
ua-parser-js : 获取客户端信息
```

### 运行方法

```
1. npm install
2. 将devenv.js文件内容补充完整，并将文件名重名为env.js
3. 开发： npm run dev
4. 正式： npm run start
```