const Redis = require('ioredis')
const {envData} = require('@/env')
const redis = new Redis(envData.REDIS_URL)

module.exports = {
  set: function (key, data, time) {
    if (time) {
      // EX为秒，PX为毫秒
      redis.set(key, data, 'EX', time)
    } else {
      redis.set(key, data)
    }
  },
  get: async function (key) {
    return await redis.get(key)
  },
  del: function (key) {
    redis.del(key)
  }
}
