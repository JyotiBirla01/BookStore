module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,

            }
        }

    }, {
        tableName: "Categories"
    });
    return Category
} 
