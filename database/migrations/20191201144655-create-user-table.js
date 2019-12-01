'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            cpf: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            token: {
                allowNull: true,
                type: Sequelize.STRING,
                unique: true,
            },

            account: {
                allowNull: true,
                type: Sequelize.STRING,
                unique: true,
            },
            agency: {
                allowNull: true,
                type: Sequelize.STRING,
                unique: false,
            },
            balance: {
                defaultValue: 500,
                type: Sequelize.DOUBLE,
                unique: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    }
};
