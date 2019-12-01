module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("History", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        user_id: DataTypes.INTEGER,
        action: DataTypes.STRING,
        value: DataTypes.DOUBLE,
    }, {
        tableName: "History"
    });

    return History;
}
