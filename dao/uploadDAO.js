/**
 * Created by yeming on 20/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');

var Upload = sequelize.define('upload', {
    author: {
        type: Sequelize.STRING,
        field: 'author'
    },
    bookName: {
        type: Sequelize.STRING,
        field: 'book_name'
    },
    url: Sequelize.STRING,
    remark: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }},
    {
    freezeTableName: true // Model tableName will be the same as the model name
    });

exports.findAll = function(callBack){
    Upload.findAll({
        'order' : [['created_at', 'desc']]
    }).then(function(result){
        callBack(result);
    });
};

exports.insert = function(param, callBack){
    Upload.create(param).then(function(result){
        callBack(result);
    });
};
