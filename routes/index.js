var express = require('express');
var router = express.Router();
var upload = require('../dao/upload');
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res, next) {
    upload.findAll(function(result){
        res.render('show');
    })
});

router.get('/show', function(req, res, next) {
    upload.findAll(function(result){
        res.json(result);
    })
});

router.post('/upload', function(req, res, next){
    var form = new formidable.IncomingForm(req),docs=[];;
    var url;
    //存放目录
    form.uploadDir = 'tmp/';
    form.parse(req);

    form.on('file', function(field, file) {
        var date = new Date();
        var ms = Date.parse(date);
        docs.push(file);
        url = "tmp/files" + ms + '_'+file.name;
        fs.renameSync(file.path, url);
    }).on('end', function() {
        var responseData={
            success: true,
            url: url
        };
        res.send(responseData);
    });
});

router.post('/submit', function(req, res, next){
    var form = new formidable.IncomingForm(req),param = {};
    //存放目录
    form.parse(req);

    form.on('field', function(field, value) {
        param[field] = value;
    }).on('end', function(){
        param['createdAt'] = new Date();
        param['updatedAt'] = new Date();
        upload.insert(param, function(){
            res.redirect("/")
        });
    });
});

router.get('/download', function(req, res, next){
    var downloadUrl = req.query.url;
    res.download(downloadUrl, function(err){
        if(err){
            console.log(err);
            console.log('download err url ' + downloadUrl);
            res.end("下载失败!");
        }
    });
});
module.exports = router;
