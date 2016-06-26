/**
 * Created by yeming on 26/6/2016.
 */
var eventproxy = require('eventproxy');
var config = require('../config');
var User = require('../dao/userDAO');

exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(403).send('forbidden!');
    }
    next();
};

exports.genSession = function genSession(user, res) {
    var auth_token = user.id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        res.locals.current_user = req.session.user = user;
        return next();
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var userId = auth[0];
        User.getUserById(userId, function(user){
            ep.emit('get_user', user);
        });
    }
};