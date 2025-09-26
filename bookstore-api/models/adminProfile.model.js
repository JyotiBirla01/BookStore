module.exports = (sequelize, DataTypes) => {
  const AdminProfile = sequelize.define("AdminProfile", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department: DataTypes.STRING,
    designation: DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
 dateOfBirth: {
      type: DataTypes.DATEONLY, 
      allowNull: true
    },
  });

  return AdminProfile;
};
