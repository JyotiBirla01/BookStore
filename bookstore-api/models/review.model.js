module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 500] // Maximum length of 500 characters
            }
        }
    })
    return Review;
}