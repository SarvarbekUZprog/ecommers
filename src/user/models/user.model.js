const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../data/database"); // Import your Sequelize instance

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmationCode: {
      type: DataTypes.INTEGER,
      defaultValue: 0 ,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true, // Adds createdAt & updatedAt fields
  }
);

module.exports = User;
