const response = require('../../util/responses');
const Account = require('../model/UserCreateAccountModel');
const Role = require('../model/RolesModel');
const Permission = require('../model/PermissionModel');
const RolePermission = require('../model/UserRolePermissionModel');
const AccountRole = require('../model/UserRolModel');

const getUserPermissions = async (userId) => {
    console.log("Usuario: " + userId);
    try {
        // Obtener permisos del usuario basado en las asociaciones definidas
        const userRoles = await Role.findAll({
            attributes: ['id', 'name'],
            where: { id: userId }
        });
    
        const result = permissions.map(permission => permission.name);
        console.log(result)
        // return permissions.map(permission => permission.name);
    } catch (error) {
        console.error('[Error obteniendo permisos del usuario]');
        // throw error;
    }
};

module.exports = {
    getUserPermissions
};