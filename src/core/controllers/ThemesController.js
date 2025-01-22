const Usuario = require('../model/UserAccountModel');
const Themes = require('../model/ThemesModel');
const { decodeToken } = require('../controllers/TokenController');

async function getAllThemes(req, res) {
    try {
        const themes = await Themes.findAll();
        res.status(200).json(themes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los temas' });
    }
}

async function getUserTheme(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];

    const decoded = decodeToken(token);
    const userID = decoded.id


    try {
        const user = await Usuario.findOne({
            where: { id: userID },
            include: {
                model: Themes,
                as: 'selectedTheme',
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(user.selectedTheme || null);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el tema del usuario' });
    }
}

async function updateUserTheme(req, res) {

    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = decodeToken(token);
    const userID = decoded.id
    const { themeSelected } = req.body;

    try {
        const theme = await Themes.findByPk(themeSelected);
        if (!theme) {
            return res.status(404).json({ message: 'Tema no encontrado' });
        }

        const user = await Usuario.findByPk(userID);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.selected_theme_id = themeSelected;
        await user.save();

        return res.status(200).json({ message: 'Tema actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el tema del usuario' });
    }
}

module.exports = {
    getAllThemes,
    getUserTheme,
    updateUserTheme,
};
