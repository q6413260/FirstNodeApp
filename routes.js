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

//router.use(function(req, res, next){
//    console.log('dend');
//    next();
//})

router.get('/showUpload', auth.userRequired, upload.showUpload);
router.get('/getUploadDatas', upload.getUploadDatas);
router.post('/upload', upload.upload);
router.post('/submit', upload.submit);
router.get('/download', upload.download);

module.exports = router;
