const { getUserPermissions } = require('../services/permissionService');

const checkPermissions = (requiredPermission) => async (req, res, next) => {
    try {
        const userPermissions = await getUserPermissions(req.user.id);
        console.log("permiso que tiene: " +userPermissions);
        console.log('se requiere: ' + requiredPermission);
        if (userPermissions == requiredPermission) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    } catch (err) {
        console.error('Error checking permissions:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = checkPermissions;