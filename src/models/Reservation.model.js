const { DataTypes } = require('sequelize');
const connection = require('../DB/mysql'); // Ajusta la ruta según tu estructura
const CustomerBooker = require('./CustomerBooker.model'); // Ajusta la ruta según tu estructura

const Reservation = connection.define('reservation', {
    reservation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'customers_booker',
            key: 'email'
        },
        onDelete: 'CASCADE' // Elimina reservas si el cliente asociado es eliminado
    },
    check_in_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    check_out_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    number_of_guests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    special_requests: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
        defaultValue: 'Pending'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'reservations',
    timestamps: true
});

// Definir asociaciones
Reservation.belongsTo(CustomerBooker, {
    foreignKey: 'customer_email',
    as: 'customer' // Alias para incluir en consultas
});

module.exports = Reservation;
