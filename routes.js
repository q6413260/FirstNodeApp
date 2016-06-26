/**
 * Created by yeming on 25/6/2016.
 */
var express = require('express');
var router = express.Router();
var login = require('./service/login');
var upload = require('./service/upload');
var auth = require('./middlewares/auth');

router.get('/login', login.showLogin);
router.post('/login', login.login);

router.get('/showUpload', auth.loginRequired, upload.showUpload);
router.get('/getUploadDatas', upload.getUploadDatas);
router.post('/upload', upload.upload);
router.post('/submit', upload.submit);
router.get('/download', upload.download);

router.get('/', auth.loginRequired, function(req, res, next){
    res.render('index');
});

module.exports = router;
