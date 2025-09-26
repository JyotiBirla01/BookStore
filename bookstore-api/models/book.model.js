const db = require(".")

module.exports=(sequelize,DataTypes)=>{
    const Book=sequelize.define("Book",{
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
            validate:{notEmpty:true}
        },
        originalPrice:{
             type:DataTypes.FLOAT,
            // allowNull:false,
            // validate:{notEmpty:true}
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,

        },
        author:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        imageUrl:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories", // Must match table name
        key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
    })
return Book
}