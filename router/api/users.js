/* login resgin */
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');  //加密
const gravatar = require('gravatar');  //头像
const jwt = require('jsonwebtoken');  //token验证
const keys = require("../../config/keys");
const passport = require('passport');


const User = require('../../models/User')
/*
	router:GET  /api/users/test
    desc: 返回json数据
 */

router.get("/test", (req, res) => {
  res.json({ msg: "test" });
});


/*
	router:POST  /api/users/register
    desc: 返回json数据
 */
router.post('/register',(req,res) => {
	User.findOne({email:req.body.email}).then((user) => {
		if(user) {
			return res.status(400).json("邮箱已经被注册")
		} else {
			const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});  //生成头像
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				avatar
			})
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newUser.password, salt,(err, hash) =>{
					
					if(err) throw err;
					
					newUser.password = hash;
					
					newUser.save().then(user => {
						res.json(user)
					}).catch(err => console.log(err))
					
				});
			});
		}
	})
})



/*
	router:POST  /api/users/login
    desc: 返回token
 */

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// 查询数据库
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json('用户不存在!');
		}

		// 密码匹配
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const rule = { id: user.id, name: user.name, avatar: user.avatar };
				jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					if (err) throw err;
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				});
			} else {
				return res.status(400).json('密码错误!');
			}
		});
	});
});

/*
	router:GET  /api/users/current
    desc: 携带token，返回用户信息
 */

router.get('/current',passport.authenticate('jwt', { session: false }),(req,res) => {
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email,
		avatar:req.user.avatar
	})
})

module.exports = router;