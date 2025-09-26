module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define("UserProfile", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
     dateOfBirth: {
      type: DataTypes.DATEONLY, 
      allowNull: true
    },
  });

  return UserProfile;
};
