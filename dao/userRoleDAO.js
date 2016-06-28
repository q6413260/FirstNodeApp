/**
 * Created by yeming on 28/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');
var UserRole = sequelize.define('userRole', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id'
    },
    status: {
        type: Sequelize.ENUM,
        value: [0, 1],
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
