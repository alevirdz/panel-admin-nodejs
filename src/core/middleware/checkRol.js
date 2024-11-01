const { getUserPermissions } = require('../controllers/PermissionController');

const checkrol = (allowedRoles) => async (req, res, next) => {
    try {
        // Verifica que req.user esté presente
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        // Obtiene los permisos del usuario desde el servicio
        const userPermissions = await getUserPermissions(req.user.id);

        // Verifica que userPermissions sea un array
        if (!Array.isArray(userPermissions)) {
            console.error('Permisos del usuario no son un array:', userPermissions);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Verifica si el rol del usuario está en los roles permitidos
        if (allowedRoles.some(role => userPermissions.includes(role))) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    } catch (err) {
        console.error('Error checking permissions:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = checkrol;