/**
 * Created by yeming on 25/6/2016.
 */
var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../dao/userDAO');
var auth = require('../middlewares/auth');

exports.showLogin = function(req, res, next){
    res.render('login');
};

exports.login = function(req, res, next){
    var name = validator.trim(req.body.name);
    var password = validator.trim(req.body.password);
    var ep = new eventproxy();
    ep.all('error', function (msg) {
        res.render('login', {error: msg});
    });

    if([name, password].some(function(item){return ''=== item})){
        return ep.emit('error', '输入信息不完整');
    }

    var condition = {};
    condition['name'] = name;
    condition['password'] = password;

    User.getUser(condition, function(user){
        if(user.length==0){
            return ep.emit('error', '用户不存在,请检查用户名或者密码');
        }
        auth.genSession(user, res);
        res.redirect('showUpload');
    });
}