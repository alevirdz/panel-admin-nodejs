const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');

const AccountRole = connection.define('AccountRole', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'accounts_roles',
    timestamps: false
});

module.exports = AccountRole;
