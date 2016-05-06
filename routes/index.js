var express = require('express');
var async = require("async");
//用于生成口令的散列值
var crypto = require('crypto');
var User = require('../models/user/user');
var router = express.Router();

router.get('/', function(req, res, next) {
    //return  res.redirect('/login');
    console.log('进入登陆页');
    res.render('login/login', { title: '登陆', loginInfo: ''});
});
router.get('/login', function(req, res, next) {
    res.render('login/login', { title: '登陆', loginInfo: ''});
});

router.post('/login', function(req, res, next) {
    console.log('登陆验证');
    console.log("username:"+req.body.username);
    console.log("password:"+req.body.password);
    //生成口令的散列值
    var  md5 = crypto.createHash('md5');
    var  password = md5.update(req.body.password).digest('base64');
    //console.log("password-MD5:"+password);

    User.getUserByName(req.body.username, function (error, user) {
        if (!user) {
            req.flash('error', ' 用户不存在');
            return  res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', ' 用户口令错误');
            return  res.redirect('/login');
        }
        console.log("获取到用户的对象的名字:"+user.username);
        console.log("获取到用户的对主页象的密码:"+user.password);
        res.redirect('/main');
    });

    /* User.get(req.body.username, function (err, user) {
         if (!user) {
             req.flash('error', ' 用户不存在');
             return  res.redirect('/getPwd');
         }
         req.flash('success', '成功找回密码:'+user.password);
         res.redirect('/login');
     });*/

});

router.get('/main', function(req, res, next) {
    res.render('main/main', { title: '主页'});
});

router.get('/userList', function(req, res, next) {
    res.render('user/userList', { title: '用户列表'});
});

router.post('/getUserListJson', function(req, res, next) {
    User.getUserList("", function (error, userList) {
        /*var userListJsonStr = JSON.stringify(userList);
        console.log("userListJsonStr:"+userListJsonStr);*/
        res.send(userList);
    });
});

router.post('/saveUser', function(req, res, next) {
    console.log("userid:"+req.body.userid);
    console.log("username:"+req.body.username);
    console.log("password:"+req.body.password);
    var md5 = crypto.createHash("md5");
    var password = md5.update(req.body.password).digest('base64');
    var newUser =  new  User({
        username: req.body.username,
        password: password
    });
    if(req.body.userid){
        newUser.updateUser(req.body.userid, function(err){
            if (err) {
                res.send(err);
            } else {
                res.send("true");
            }
        })
    }else{
        newUser.addUser(function(err){
            if (err) {
                res.send(err);
            } else {
                res.send("true");
            }
        })
    }
});

router.post('/checkUserName', function(req, res, next) {
    User.getUserByName(req.body.username, function (error, user) {
        if (user) {
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

router.post('/deleteUser', function(req, res, next) {
    console.log("用户ID:"+req.body.ids);
    var ids = req.body.ids;
    var idArr = ids.split(",");
    for(var i=0; i<idArr.length; i++){
        User.deleteUser(idArr[i], function(err){
            if (err) {
                res.send(err);
            }
        })
    }
    res.send("true");
});


router.get('/regUser', function(req, res, next) {
    res.render('hello', { title: 'Hello, World! 你好'});
});

module.exports = router;
