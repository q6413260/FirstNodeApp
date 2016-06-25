/**
 * Created by yeming on 25/6/2016.
 */
var formidable = require('formidable');
var fs = require('fs');
var upload = require('../dao/uploadDAO');

exports.showUpload = function(req, res, next){
    res.render('showUpload');
};

exports.getUploadDatas = function(req, res, next){
    upload.findAll(function (result) {
        res.json(result);
    })
};

exports.upload = function(req, res, next){
    var form = new formidable.IncomingForm(req), docs = [];
    var url;
    form.uploadDir = 'tmp/';
    form.parse(req);
    form.on('file', function (field, file) {
        var date = new Date();
        var ms = Date.parse(date);
        docs.push(file);
        url = "/tmp/files" + ms + '_' + file.name;
        fs.renameSync(file.path, url);
    }).on('end', function () {
        var responseData = {
            success: true,
            url: url
        };
        res.send(responseData);
    }).on('error', function (err) {
        console.log(err);
    });
};

exports.submit = function(req, res, next){
    var form = new formidable.IncomingForm(req), param = {};
    //存放目录
    form.parse(req);

    form.on('field', function (field, value) {
        param[field] = value;
    }).on('end', function () {
        param['createdAt'] = new Date();
        param['updatedAt'] = new Date();
        upload.insert(param, function () {
            res.redirect("/")
        });
    });
};

exports.download = function(req, res, next){
    var downloadUrl = req.query.url;
    res.download(downloadUrl, function (err) {
        if (err) {
            console.log(err);
            res.end("下载失败!");
        }
    });
};