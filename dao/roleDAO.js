/**
 * Created by yeming on 27/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');

var Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    isAdmin: {
        type: Sequelize.ENUM,
        values: ['Y', 'N'],
        field: 'is_admin'
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

module.exports = Role;