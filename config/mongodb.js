const mongoose = require('mongoose')
const { ContentSchema, MemorySchema, PublicSchema, UserSchema } = require('../utils/mongodbSchema')
const { envData } = require('../env')

mongoose.connect(envData.DB_LINK)
const ContentModel = mongoose.model('Content', ContentSchema)
const MemoryModel = mongoose.model('Memory', MemorySchema)
const PublicModel = mongoose.model('Public', PublicSchema)
const UserModel = mongoose.model('User', UserSchema)
module.exports = { ContentModel, MemoryModel, PublicModel, UserModel }
