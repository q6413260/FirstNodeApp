var Sequelize = require('sequelize');
var connection = new Sequelize('node', 'root', '6413260', {
    host: '127.0.0.1',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

connection
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = connection;