/**
 * Created by yeming on 25/6/2016.
 */
var Sequelize = require('sequelize');
var sequelize = require('../data_source');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: id
    },
    name: {
        type: Sequelize.STRING,
        field: name
    },
    password: {
        type: Sequelize.STRING,
        field: password
    },
    status: {
        type:   Sequelize.ENUM,
        values: ['0', '1'],
        field: status
    },
    createdAt: {
        type: Sequelize.DATE,
        field: created_at,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: updated_at,
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.STRING,
        field: created_by
    },
    updatedBy: {
        type: Sequelize.STRING,
        field: updated_by
    }
}, {freezeTableName: true});

