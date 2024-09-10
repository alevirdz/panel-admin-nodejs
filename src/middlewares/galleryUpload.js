const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para almacenamiento en disco
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'galleryUpload/';
        // Verifica si el directorio existe, si no, lo crea
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo: 5 MB
    fileFilter: (req, file, cb) => {
        // Acepta solo imágenes
        const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (mimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

// Exportar la instancia de multer
module.exports = upload;