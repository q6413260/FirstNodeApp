/**
 * Created by yeming on 28/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');
var MenuRole = sequelize.define('menu_role', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    menuId: {
        type: Sequelize.INTEGER,
        field: 'menu_id'
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id'
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Y', 'N'],
        field: 'status'
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

module.exports = MenuRole;

