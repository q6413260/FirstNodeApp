/**
 * Created by yeming on 25/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');
var Role = require('./roleDAO');
var Menu = require('./menuDAO');
var MenuRole = require('./menuRoleDAO');
var UserRole = require('./userRoleDAO');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    status: {
        type: Sequelize.ENUM,
        values: [0, 1],
        field: 'status'
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id'
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

User.belongsTo(Role);

exports.getUserRoleByName = function(name, callBack){
    User.findOne({
        include: [{
            model: Role,
            required: true,
            attributes: ['isAdmin']
        }],
        where: {name: name}
    }).then(function (user) {
        console.log(JSON.stringify(user));
    });
};

exports.getAccessMemuByUserId = function(id, callBack){
    sequelize.query('select u.id as id, m.menu_id as menuId from user u inner join menu_role m ' +
        'on u.role_id = m.role_id where u.id = :id', {model: MenuRole, replacements: {id: id}})
        .then(function(result){
            callBack(result);
        });
};

exports.getUser = function(condition, callBack){
    User.findAll({
        where: condition
    }).then(function(result){
        var user = result[0].dataValues;
        callBack(user);
    })
};

exports.getUserById = function(userId, callBack){
    User.findById(userId).then(function(user){
        callBack(user);
    })
};

