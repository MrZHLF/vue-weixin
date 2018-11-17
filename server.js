const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//引入users.js

const users = require('./router/api/users')
const profiles = require("./router/api/profiles");
/* 
app.get('/',(req,res) => {
	res.send('Helle World')
}) */

//引入config MongoDB数据地址

const db = require('./config/keys').mongoURI

const port  = process.env.PORT || 5000;


//bodyParser中间件
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));


//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//使用router api接口
app.use('/api/users',users);
app.use("/api/profiles", profiles);


//链接mongoose
mongoose.connect(db,{userNewlParser:true}).then(() => {
	console.log("MongoDB链接成功")
}).catch(err => {
	console.log(err)
})


app.listen(port,() => {
	console.log(`Server running on port ${port}`);
})