const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Student = connection.sequelize.define(
  "Student",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    tableName: "Students",
    timestamps: true
  }
);

module.exports = { Student };