const respuesta = require('../red/respuestas');
const Account = require('../models/Account.model');
const Role = require('../models/Role.model');
const Permission = require('../models/Permission.model');
const RolePermission = require('../models/RolePermission.model');
const AccountRole = require('../models/AccountRole.model');

const getUserPermissions = async (userId) => {
    console.log("En el servicio: " + userId);
    try {
        // Obtener permisos del usuario basado en las asociaciones definidas
        const userRoles = await Role.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: Account,
                attributes: [],
                through: {
                    model: AccountRole,
                    attributes: [] // No necesitamos atributos de AccountRole
                },
                where: { id: userId }
            }]
        });
        

        const roleIds = userRoles.map(role => role.id);
        console.log(roleIds)

        const permissions = await Permission.findAll({
            attributes: ['name'],
            include: [{
                model: Role,
                attributes: [],
                through: {
                    model: RolePermission,
                    attributes: [], // No necesitamos atributos de RolePermission
                },
                where: {
                    id: roleIds
                }
            }]
        });

        return permissions.map(permission => permission.name);
    } catch (error) {
        console.error('[Error obteniendo permisos del usuario]');
        // throw error;
    }
};

module.exports = {
    getUserPermissions
};