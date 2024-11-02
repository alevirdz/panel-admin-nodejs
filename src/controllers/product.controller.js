const response = require('../util/responses');
const Product = require('../models/Products.model');

exports.index = (req, res) => {
    try {
        response.success(req, res, 'Bienvenido al index', 200);
    } catch (err) {
        console.error('Error en index:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return response.error(req, res, 'No se proporcionó el campo: ID', 400);
        }

        const product = await Product.findByPk(id);

        if (!product) {
            return response.error(req, res, 'Producto no encontrado', 404);
        }

        response.success(req, res, { product }, 200);

    } catch (err) {
        console.error('Error en getProductById:', err);
        return response.error(req, res, 'Ocurrió un problema en el servidor', 500);
    }
};

exports.getCatalogo = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error en getCatalogo:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.addCatalogo = async (req, res) => {
    try {
        const { name, description, quantity, price } = req.body;

        if (!name || !description || !quantity || !price) {
            return response.error(req, res, 'Faltan campos requeridos: Los datos no están completos', 400);
        }

        const newProduct = await Product.create({
            name,
            description,
            quantity,
            price
        });

        response.success(req, res, 'Producto creado exitosamente', 201);

    } catch (err) {
        console.error('Error en register:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteCatalogo = async (req, res) => {
    try {
        const catalogoId = req.params.id;

        if (!catalogoId) {
            return response.error(req, res, 'ID del producto no proporcionado', 400);
        }

        const deleted = await Product.destroy({ where: { id: catalogoId } });

        if (deleted) {
            res.status(200).json({ message: `Producto con ID ${catalogoId} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Producto con ID ${catalogoId} no encontrado` });
        }

    } catch (err) {
        console.error('Error en deleteCatalogo:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
