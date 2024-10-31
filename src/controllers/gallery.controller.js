const response = require('../HTTP/responses');
const Gallery = require('../models/Gallery.model');



exports.index = (req, res) => {
    try {
        response.success(req, res, 'Bienvenido al index', 200);
    } catch (err) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getImageById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return response.error(req, res, 'No se proporcionó el campo: ID', 400);
        }

        const product = await Gallery.findByPk(id);

        if (!product) {
            return response.error(req, res, 'Producto no encontrado', 404);
        }

        response.success(req, res, { product }, 200);

    } catch (err) {
        console.error('Error en getProductById:', err);
        return response.error(req, res, 'Ocurrió un problema en el servidor', 500);
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const products = await Gallery.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error en getCatalogo:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.addImage = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { filename, path: filePath } = req.file;

        if (!name || !description || !filename || !filePath) {
            return response.error(req, res, 'Faltan campos requeridos: Los datos no están completos', 400);
        }

        // Construir la URL del archivo
        const url = `http://localhost:3000/${filename}`;

        const newImage = await Gallery.create({
            name,
            description,
            url,
            path: filePath
        });

        response.success(req, res, 'Imagen creada exitosamente', 201);

    } catch (err) {
        console.error('Error en addImage:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, description } = req.body;

        if (!id) {
            return response.error(req, res, 'No se proporcionó el campo: ID', 400);
        }

        const image = await Image.findByPk(id);
        if (!image) {
            return response.error(req, res, 'Imagen no encontrada', 404);
        }

        // Actualiza los campos de la imagen
        image.url = url || image.url;
        image.description = description || image.description;

        await image.save();
        response.success(req, res, { image }, 200);
    } catch (err) {
        console.error('Error en updateImage:', err);
        response.error(req, res, 'Ocurrió un problema en el servidor', 500);
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const catalogoId = req.params.id;

        if (!catalogoId) {
            return response.error(req, res, 'ID del Image no proporcionado', 400);
        }

        const deleted = await Gallery.destroy({ where: { id: catalogoId } });

        if (deleted) {
            res.status(200).json({ message: `Image con ID ${catalogoId} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Image con ID ${catalogoId} no encontrado` });
        }

    } catch (err) {
        console.error('Error en delete:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
