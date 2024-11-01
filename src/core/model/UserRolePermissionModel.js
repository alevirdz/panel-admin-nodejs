const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');

const RolePermission = connection.define('RolePermission', {
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'permissions',
            key: 'id'
        }
    }
}, {
    tableName: 'role_permissions',
    timestamps: false
});

module.exports = RolePermission;
