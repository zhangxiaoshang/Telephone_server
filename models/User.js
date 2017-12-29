const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const userSchema = new Schema({
	openid: String,
	avatar_url: String,
	name: String,
	gender: String,
	phone: String,
	department: String,
	level: { type: Number, default: 0 }
})

module.exports = mongoose.model('Users', userSchema)