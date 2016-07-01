/**
 * Created by yeming on 27/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');

var Menu = sequelize.define('menu', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    url: {
        type: Sequelize.STRING,
        field: 'url'
    },
    parentId: {
        type: Sequelize.INTEGER,
        field: 'parent_id'
    },
    orderNo: {
        type: Sequelize.INTEGER,
        field: 'order_no'
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Y', 'N'],
        field: 'status',
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.STRING,
        field: 'created_by'
    },
    updatedBy: {
        type: Sequelize.STRING,
        field: 'updated_by'
    }
}, {freezeTableName: true});

exports.getMenuById = function(id, callback){
    Menu.findById(id).then(function(menu){
        callback(menu);
    });
};

