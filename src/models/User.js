module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        token: DataTypes.STRING,
        cpf: DataTypes.STRING,

        account: DataTypes.STRING,
        agency: DataTypes.STRING,
        balance: DataTypes.DOUBLE,
    });

    return User;
}
