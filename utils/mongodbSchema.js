const mongoose = require('mongoose')
const dayjs = require('dayjs')

const ContentSchema = new mongoose.Schema(
  {
    create_user_openid: { type: String, default: '' },
    create_date: {
      type: Date,
      default: Date.now,
      get: t => dayjs(t).format('YYYY/MM/DD')
    },
    content: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  {
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true }
  }
)

const MemorySchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    content: { type: String, default: '' },
    back_img: { type: String, default: '' },
    music_src: { type: String, default: '' },
    music_title: { type: String, default: '' },
    music_epname: { type: String, default: '' },
    music_singer: { type: String, default: '' },
    music_coverImgUrl: { type: String, default: '' },
    music_webUrl: { type: String, default: '' }
  },
  {
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true }
  }
)

const PublicSchema = new mongoose.Schema(
  {
    type: { type: Number, default: 1 },
    content: { type: String, default: '' },
    is_del: { type: Boolean, default: false },
    create_time: {
      type: Date,
      default: Date.now,
      get: t => dayjs(t).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  {
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true }
  }
)

const UserSchema = new mongoose.Schema(
  {
    openid: { type: String, default: '' },
    create_date: {
      type: Date,
      default: Date.now,
      get: t => dayjs(t).format('YYYY/MM/DD')
    },
    avatar: { type: String, default: '' },
    lover_openid: { type: String, default: '' },
    name: { type: String, default: '' },
    begin_date: {
      type: Date,
      default: Date.now,
      get: t => dayjs(t).format('YYYY/MM/DD')
    },
    type: { type: String, default: 'user' }
  },
  {
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true }
  }
)

module.exports = { ContentSchema, MemorySchema, PublicSchema, UserSchema }
