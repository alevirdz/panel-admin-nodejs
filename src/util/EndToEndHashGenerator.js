const crypto = require('crypto');
require('dotenv').config();

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const SALT_LENGTH = 32;
const PASSPHRASE = process.env.ENCRYPTION_PASSPHRASE;

if (!PASSPHRASE) {
    throw new Error("La frase de encriptación no está definida en el archivo .env");
}

const generateKey = (passphrase, salt) =>
    crypto.scryptSync(passphrase, salt, KEY_LENGTH, { N: 16384, r: 8, p: 1 });
    const generateIv = () => crypto.randomBytes(IV_LENGTH);
    const generateSalt = () => crypto.randomBytes(SALT_LENGTH);

    const validateEncryptedData = (encryptedText) => {
        const parts = encryptedText.split(':');
        if (parts.length !== 4) {
            throw new Error("El texto encriptado no tiene el formato esperado");
        }
        return parts;
};

const encrypt = (input) => {
    let textToEncrypt;

    // Si es un objeto o cualquier cosa que no sea una cadena, conviértelo a JSON
    if (typeof input !== 'string') {
        textToEncrypt = JSON.stringify(input);
    } else {
        textToEncrypt = input;
    }

    const salt = generateSalt();
    const key = generateKey(PASSPHRASE, salt);
    const iv = generateIv();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${salt.toString('hex')}:${encrypted}:${authTag}`;
};

const decrypt = (encryptedText) => {
    const [ivHex, saltHex, encrypted, authTagHex] = validateEncryptedData(encryptedText);

    const iv = Buffer.from(ivHex, 'hex');
    const salt = Buffer.from(saltHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const key = generateKey(PASSPHRASE, salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
        return JSON.parse(decrypted);
    } catch (e) {
        return decrypted;
    }
};

module.exports = { encrypt, decrypt };
