const mongoose = require('mongoose')
const UserModel = require('../models/User')

const request = require('request');

mongoose.connect('mongodb://localhost/TelephoneBook')
const db = mongoose.connection

class UserController {
	constructor () {
		console.log('UserController constructor')
	}

	login (jsCode) {
		return new Promise((resolve, reject) => {
			this.getOpenId(jsCode).then(openid => {
				console.log('openid', openid)
				UserModel.findOne({ openid: openid }, (err, adventure) => {
					if (adventure) {
						resolve(adventure)
					} else {
						reject('用户不存在')

					}
				})
			})
		})
	}

	getOpenId (jsCode) {
		let options = {
			url: 'https://api.weixin.qq.com/sns/jscode2session',
			method: 'GET',
			qs: {
				appid: 'wx8ead5086e1e601dc',
				secret: '9ea72235423ebc16aea68070bd4f752e',
				js_code: jsCode,
				grant_type: 'authorization_code'
			}
		}

		return new Promise ((resolve, reject) => {
			request(options, (e, r, data) => {
				if (data.errcode === '40029') {
					reject('js_code无效')
				} else {
					resolve(JSON.parse(data).openid)
				}
			})
		})
	}

	new (form) {
		return new Promise((resolve, reject) => {
			this.getOpenId(form.js_code).then(openid => {
				form.openid = openid
				form.level = 0

				let user = new UserModel(form)
				user.save((err, product) => {
					if (err) {
						reject(err)				
					} else {
						resolve(product)
					}
				})
			})
		})
	}
}

module.exports = UserController