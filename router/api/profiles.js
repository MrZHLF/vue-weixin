/* login resgin */
const express = require("express");
const router = express.Router();
const passport = require('passport');
//数据模型
const Profile = require("../../models/Profile");


/*
	router:GET  /api/profiles/test
    desc: 返回json数据
 */

router.get('/test', (req, res) => {
    res.json({ msg: "profiles数据连接成功" });
})

/*
	router:GET  /api/profiles/add
    desc: 返回json数据
 */
router.post('/add', passport.authenticate('jwt', { session: false }),(req,res) => {
    const profilesFields={};
    //获取数据库中的数据
    if(req.body.img) profilesFields.img =  req.body.img;
    if (req.body.name) profilesFields.name = req.body.name;
    if (req.body.text) profilesFields.text = req.body.text;

    //存储多张图片
    if(req.body.imgs) {
        profilesFields.imgs = req.body.imgs.split('|');
    }

    //存储数据
    new Profile(profilesFields).save().then((profile) => {
        res.json(profile)
    }).catch((err) => {
        console.log(err)
    });
})


/*
	router:GET  /api/profiles/latest
    desc: 下拉刷新
 */
router.get(
    '/latest',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .sort({ date: -1 })
            .then(profiles => {
                if (!profiles) {
                    res.status(404).json('没有任何消息');
                } else {
                    let newProfiles = [];
                    for (let i = 0; i < 3; i++) {
                        if (profiles[i] != null) {
                            newProfiles.push(profiles[i]);
                        }
                    }
                    res.json(newProfiles);
                }
            });
    }
);


/*
	router:GET  /api/profiles/:page/size
    desc: 上拉加载
 */

router.get(
  '/:page/:size',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ date: -1 })
      .then(profiles => {
        if (!profiles) {
          res.status(404).json('没有任何信息');
        } else {
          let size = req.params.size;
          let page = req.params.page;
          let index = size * (page - 1);
          let newProfiles = [];
          for (let i = index; i < size * page; i++) {
            if (profiles[i] != null) {
              newProfiles.unshift(profiles[i]);
            }
          }
          res.json(newProfiles);
        }
      });
  }
);

module.exports = router;