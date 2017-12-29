var express = require('express');
var router = express.Router();


const UserController = require('../controllers/User')
const user = new UserController()

/* GET users listing. */
router.get('/login', function (req, res, next) {
	user.login(req.query.js_code).then(result => {
		res.json({
			success: true,
			body: result
		})
	}, errmsg => {
		res.json({
			success: false,
			errmsg: errmsg
		})
	})
});

router.post('/', function (req, res, next) {
	user.new(req.body).then(result => {
		res.json({
			success: true,
			body: result
		})
	}, err => {
		console.error('err', result)
	})
});

module.exports = router;
